import { isArray, isBoolean, isInteger, isNumber } from 'lodash';
import { parse } from 'papaparse';

import { DataSource } from '../../shared/data-source';
import { GraphicVariable } from '../../shared/graphic-variable';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { ActivityLogDataSource } from '../activity-log/log-data-source';
import { DefaultDataSource } from './default-data-source';
import { DefaultGraphicVariableMapping } from './default-graphic-variable';
import { DefaultProject } from './default-project';
import { DefaultRawData } from './default-raw-data';
import { DefaultRecordSet } from './default-record-set';


export class CSVTemplateProject extends DefaultProject {
  private fields: { [suffix: number]: string[] } = {};
  private fieldTypes: { [suffix: number]: { [field: string]: string } } = {};

  static async create(csvFileContents: string[] | string, fileNames?: string[] | string): Promise<Project> {
    const project = new CSVTemplateProject(csvFileContents, fileNames);
    return project;
  }

  constructor(csvFileContents: string[] | string, fileNames?: string[] | string) {
    super();
    csvFileContents = isArray(csvFileContents) ? csvFileContents : [csvFileContents];
    fileNames = isArray(fileNames) ? fileNames : [fileNames];
    if (!fileNames) {
      fileNames = csvFileContents.map(s => '');
    }
    csvFileContents.forEach((csvContent, i) => {
      const suffix = i + 1;
      this.rawData = this.rawData.concat(this.getRawData(csvContent, suffix));
      this.dataSources = this.dataSources.concat(this.getDataSources(suffix));
      this.recordSets = this.recordSets.concat(this.getRecordSets(fileNames[i], suffix));
      this.graphicVariables = this.graphicVariables.concat(this.getGraphicVariables(suffix));
    });

    this.dataSources.push(
      new ActivityLogDataSource({
        id: 'activityLog',
        properties: { rawData: 'activityLog', keepPreviousActivity: true, freezeLogs: false },
        recordStreams: [{ id: 'activityLog', label: 'Activity Log' }]
      }, this)
    );
  }

  getRawData(csvFileContents: string, suffix = 0): RawData[] {
    const rawData = [];
    const parseResults = parse(csvFileContents, { header: true, dynamicTyping: true, skipEmptyLines: true });
    this.fields[suffix] = parseResults.meta.fields;
    this.fieldTypes[suffix] = this.inferDataTypes(parseResults.data);

    rawData.push(
      new DefaultRawData({ id: 'csvRawData' + suffix, template: 'json', data: { ['csvData' + suffix]: parseResults.data } })
    );

    return rawData;
  }

  private getDataVariableNames(fields: string[]): string[] {
    const dataVariableNames = [];
    fields.forEach((field: string) => {
      const dataVar = field.trim().split('$$')[0];
      if ((dataVar.length !== 0) && (!dataVariableNames.includes(dataVar))) {
        dataVariableNames.push(dataVar);
      }
    });
    return dataVariableNames;
  }

  private inferDataTypes(data: any[]): { [field: string]: string } {
    const types: { [field: string]: string } = {};

    data.forEach(item => Object.entries(item).forEach(([key, value]) => {
      if (isInteger(value)) {
        types[key] = 'integer';
      } else if (isNumber(value)) {
        types[key] = 'number';
      } else if (isBoolean(value)) {
        types[key] = 'text';
        item[key] = value ? 'true' : 'false';
      } else if (!types.hasOwnProperty(key)) {
        types[key] = 'text';
      }
    }));

    return types;
  }

  getDataSources(suffix = 0): DataSource[] {
    return [
      new DefaultDataSource({
        id: 'csvDataSource' + suffix,
        properties: { rawData: 'csvRawData' + suffix },
        recordStreams: [{ id: 'csvData' + suffix, label: 'CSV Data ' + suffix }]
      }, this)
    ];
  }

  getRecordSets(fileName: string, suffix = 0): RecordSet[] {
    const recordSets = [
      new DefaultRecordSet({
        id: 'csvData' + suffix,
        label: 'CSV Data ' + suffix,
        labelPlural: 'CSV Data ' + suffix,
        description: fileName || undefined,
        defaultRecordStream: 'csvData' + suffix,
        dataVariables: this.getDataVariableNames(this.fields[suffix]).map(f => {
          return { id: f, label: f, dataType: this.fieldTypes[suffix][f] || 'text', scaleType: '???' };
        })
      }, this)
    ];
    recordSets.forEach(rs => rs.resolveParent(recordSets));
    return recordSets;
  }

  getGraphicVariables(suffix = 0): GraphicVariable[] {
    // Setup some default _naive_ graphic variable mappings.
    const dataVariables = this.getDataVariableNames(this.fields[suffix]);
    const mappingFields = this.fields[suffix].filter((field: string) => field.trim().split('$$').length > 1);

    const mappings = this.getNaiveMappings(dataVariables, suffix);
    const predefinedMappings = this.getPredefinedMappings(mappingFields);

    for (const dataVariableName of Object.keys(predefinedMappings)) {
      Object.assign(mappings[dataVariableName] || {}, predefinedMappings[dataVariableName]);
    }

    return DefaultGraphicVariableMapping.fromJSON([
      {
        recordStream: 'csvData' + suffix,
        mappings: {
          ['csvData' + suffix]: mappings
        }
      }
    ], this);
  }

  getPredefinedMappings(mappingFields: string[]): {} {
    const predefinedMappings = {};

    for (const field of mappingFields) {
      const splitFields = field.trim().split('$$');
      if (splitFields.length > 1) {
        if (!predefinedMappings[splitFields[0]]) {
          predefinedMappings[splitFields[0]] = {};
        }
        predefinedMappings[splitFields[0]][splitFields[1]] = [{ selector: field }];
      }
    }

    return predefinedMappings;
  }

  getNaiveMappings(dataVariables: string[], suffix = 0): {} {
    const naiveMappings = {};

    for (const field of dataVariables) {
      let types = ['identifier', 'axis', 'text', 'tooltip', 'label', 'input', 'order'];

      if (this.fieldTypes[suffix][field] === 'integer' || this.fieldTypes[suffix][field] === 'number') {
        // These are _guesses_ and not likely correct
        types = types.concat(['areaSize', 'strokeWidth', 'fontSize']);
      }

      if (this.fieldTypes[suffix][field] === 'text' && field.toLowerCase().indexOf('color') !== -1) {
        // These are _guesses_ and not likely correct
        types = types.concat(['color', 'strokeColor']);
      }

      // Use the field name as a graphic variable type.
      // Use Case: User formats their csv to have color in color column, etc.
      if (!types.find(t => t === field)) {
        types.push(field);
      }

      naiveMappings[field] = {};
      types.forEach(t => naiveMappings[field][t] = [{ selector: field }]);
    }

    return naiveMappings;
  }
}
