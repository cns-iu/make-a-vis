import { castArray, filter, find, includes, map, partition, some, toLower, trim, uniqBy, zipWith } from 'lodash';

import { parse, ParseMeta, ParseResult } from '../../shared/csv-parser';
import { DataSource } from '../../shared/data-source';
import { DataType, DataVariable } from '../../shared/data-variable';
import { GraphicVariable, GraphicVariableType } from '../../shared/graphic-variable';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { ActivityLogDataSource } from '../activity-log/log-data-source';
import { DefaultDataSource } from './default-data-source';
import { DefaultGraphicVariableMapping } from './default-graphic-variable';
import { DefaultProject } from './default-project';
import { DefaultRawData } from './default-raw-data';
import { DefaultRecordSet } from './default-record-set';

type StringTransform = (value: string) => string;


class NormalizedField {
  static readonly splitSequence = '$$';

  readonly key: string;
  readonly variableType?: GraphicVariableType = undefined;
  get fullKey(): string {
    const suffix = NormalizedField.splitSequence + this.variableType;
    return this.key + (this.variableType ? suffix : '');
  }
  get selector(): string { return this.field; }
  get selectorObj(): { selector: string } { return { selector: this.selector }; }
  get isMapping(): boolean { return this.variableType !== undefined; }

  constructor(private field: string, readonly dataType: DataType) {
    const normalized = this.key = trim(toLower(field));
    const index = normalized.indexOf(NormalizedField.splitSequence);
    if (index !== -1) {
      const type = normalized.slice(index + NormalizedField.splitSequence.length);
      this.key = normalized.slice(0, index);
      this.variableType = find(GraphicVariableType, value => toLower(value) === type);
    }
  }
}

export class CSVTemplateProject extends DefaultProject {
  static async create(csvFileContents: string[] | string, fileNames?: string[] | string): Promise<Project> {
    const project = new CSVTemplateProject(csvFileContents, fileNames);
    return project;
  }

  constructor(csvFileContents: string[] | string, fileNames?: string[] | string) {
    super();
    console.log(this); // Remove me

    const names = castArray(fileNames);
    const contents = castArray(csvFileContents);
    for (let index = 0; index < contents.length; index++) {
      const suffixer: StringTransform = value => `${value}${index + 1}`;
      const name = names[index] || '';
      const parsed = this.getParsedData(contents[index]);
      // TODO put errors in log
      const [regularFields, mappingFields] = this.normalizeFields(parsed.meta);

      // Order is very important here!
      this.rawData.push(this.createRawData(parsed.data, suffixer));
      this.dataSources.push(this.createDataSource(suffixer));
      this.recordSets.push(this.createRecordSet(name, regularFields, suffixer));
      this.graphicVariables.push(...this.createGraphicVariables(regularFields, mappingFields, suffixer));
    }

    this.dataSources.push(
      new ActivityLogDataSource({
        id: 'activityLog',
        properties: { rawData: 'activityLog', keepPreviousActivity: true, freezeLogs: false },
        recordStreams: [{ id: 'activityLog', label: 'Activity Log' }]
      }, this)
    );
  }

  private getParsedData(raw: string): ParseResult {
    return parse(raw, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
  }

  private normalizeFields(meta: ParseMeta): [NormalizedField[], NormalizedField[]] {
    const normalized = zipWith(meta.fields, meta.typings, (field, dataType) => new NormalizedField(field, dataType));
    const [mapping, regular] = partition(normalized, 'isMapping');
    const regularUniq = uniqBy(regular, 'key');
    const mappingUniq = uniqBy(mapping, 'fullKey');

    // Add missing regular fields
    for (const field of mappingUniq) {
      if (!some(regularUniq, ['key', field.key])) {
        regularUniq.push(new NormalizedField(field.key, DataType.UNKNOWN));
      }
    }

    return [regularUniq, mappingUniq];
  }

  private createRawData(data: any[], suffixer: StringTransform): RawData {
    return new DefaultRawData({
      id: suffixer('csvRawData'),
      template: 'json',
      data: {
        [suffixer('csvData')]: data
      }
    });
  }

  private createDataSource(suffixer: StringTransform): DataSource {
    return new DefaultDataSource({
      id: suffixer('csvDataSource'),
      properties: {
        rawData: suffixer('csvRawData')
      },
      recordStreams: [{
        id: suffixer('csvData'),
        label: suffixer('CSV Data ')
      }]
    }, this);
  }

  private createDataVariableArgs(
    field: NormalizedField
  ): Pick<DataVariable, 'id' | 'label' | 'dataType' | 'scaleType'> {
    return {
      id: field.selector,
      label: field.selector,
      dataType: field.dataType,
      scaleType: '???'
    };
  }

  private createRecordSet(name: string, fields: NormalizedField[], suffixer: StringTransform): RecordSet {
    return new DefaultRecordSet({
      id: suffixer('csvData'),
      label: suffixer('CSV Data '),
      labelPlural: suffixer('CSV Data '),
      description: name,
      defaultRecordStream: suffixer('csvData'),
      dataVariables: map(fields, this.createDataVariableArgs)
    }, this);
  }

  private createMapping(
    field: NormalizedField,
    mappingFields: NormalizedField[]
  ): { [T in GraphicVariableType]?: [{ selector: string }] } {
    const defaultSelector: () => [{ selector: string }] = () => [field.selectorObj];
    const mapping: { [T in GraphicVariableType]?: [{ selector: string }] } = {
      [GraphicVariableType.IDENTIFIER]: defaultSelector(),
      [GraphicVariableType.AXIS]: defaultSelector(),
      [GraphicVariableType.TEXT]: defaultSelector(),
      [GraphicVariableType.TOOLTIP]: defaultSelector(),
      [GraphicVariableType.LABEL]: defaultSelector(),
      [GraphicVariableType.INPUT]: defaultSelector(),
      [GraphicVariableType.ORDER]: defaultSelector()
    };

    // The following are guesses and likely not correct
    if (field.dataType === DataType.NUMBER || field.dataType === DataType.INTEGER) {
      mapping[GraphicVariableType.AREA_SIZE] = defaultSelector();
      mapping[GraphicVariableType.STROKE_WIDTH] = defaultSelector();
      mapping[GraphicVariableType.FONT_SIZE] = defaultSelector();
    }
    if (field.dataType === DataType.STRING && includes(field.key, 'color')) {
      mapping[GraphicVariableType.COLOR] = defaultSelector();
      mapping[GraphicVariableType.STROKE_COLOR] = defaultSelector();
    }

    // Use the field name as a graphic variable type.
    // Use Case: User formats their csv to have color in color column, etc.
    const type = find(GraphicVariableType, value => toLower(value) === field.key);
    if (type) {
      mapping[type] = defaultSelector();
    }

    // Override with predefined mappings
    for (const mappingField of filter(mappingFields, ['key', field.key])) {
      mapping[mappingField.variableType] = [mappingField.selectorObj];
    }

    return mapping;
  }

  private createGraphicVariables(
    regularFields: NormalizedField[],
    mappingFields: NormalizedField[],
    suffixer: StringTransform
  ): GraphicVariable[] {
    const variables: { [id: string]: { [T in GraphicVariableType]?: [{ selector: string }] } } = {};
    for (const field of regularFields) {
      variables[field.selector] = this.createMapping(field, mappingFields);
    }

    return DefaultGraphicVariableMapping.fromJSON([{
      recordStream: suffixer('csvData'),
      mappings: {
        [suffixer('csvData')]: variables
      }
    }], this);
  }
}
