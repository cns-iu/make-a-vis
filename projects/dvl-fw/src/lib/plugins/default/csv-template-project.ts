import { parse } from 'papaparse';
import { isInteger, isNumber, isBoolean } from 'lodash';

import { ActivityLogDataSource } from '../activity-log/log-data-source';
import { DefaultGraphicVariableMapping } from './default-graphic-variable';
import { DefaultProject } from './default-project';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { DefaultRawData } from './default-raw-data';
import { DataSource } from '../../shared/data-source';
import { DefaultDataSource } from './default-data-source';
import { DefaultRecordSet } from './default-record-set';
import { RecordSet } from '../../shared/record-set';
import { GraphicVariable } from '../../shared/graphic-variable';
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { Visualization } from '../../shared/visualization';
import { ScatterplotVisualization } from '../ngx-dino/visualizations';
import { DefaultGraphicSymbol } from './default-graphic-symbol';


export class CSVTemplateProject extends DefaultProject {
  private fields: string[];
  private fieldTypes: {[field: string]: string};

  static async create(isiFileContent: string, fileName?: string): Promise<Project> {
    const project = new CSVTemplateProject(isiFileContent, fileName);
    return project;
  }

  constructor(csvFileContent: string, fileName?: string) {
    super();
    this.rawData = this.getRawData(csvFileContent);
    this.dataSources = this.getDataSources();
    this.recordSets = this.getRecordSets(fileName);
    this.graphicVariables = this.getGraphicVariables();
    this.graphicSymbols = this.getGraphicSymbols();
    this.visualizations = this.getVisualizations();
  }

  getRawData(csvFileContent: string): RawData[] {
    const parseResults = parse(csvFileContent, {header: true, dynamicTyping: true});
    this.fields = parseResults.meta.fields;
    this.fieldTypes = this.inferDataTypes(parseResults.data);

    return [
      new DefaultRawData({id: 'csvRawData', template: 'json', data: {csvData: parseResults.data}})
    ];
  }
  private inferDataTypes(data: any[]): {[field: string]: string} {
    const types: {[field: string]: string} = {};

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

  getDataSources(): DataSource[] {
    return [
      new DefaultDataSource({
        id: 'csvDataSource',
        properties: { rawData: 'csvRawData' },
        recordStreams: [{id: 'csvData', label: 'CSV Data'}]
      }, this),
      new ActivityLogDataSource({
        id: 'activityLog',
        properties: { rawData: 'activityLog', keepPreviousActivity: true, freezeLogs: false },
        recordStreams: [{id: 'activityLog', label: 'Activity Log'}]
      }, this)
    ];
  }

  getRecordSets(fileName: string): RecordSet[] {
    const recordSets = [
      new DefaultRecordSet({
        id: 'csvData',
        label: 'CSV Data',
        labelPlural: 'CSV Data',
        description: fileName || undefined,
        defaultRecordStream: 'csvData',
        dataVariables: this.fields.map(f => {
          return {id: f, label: f, dataType: this.fieldTypes[f] || 'text', scaleType: '???'};
        })
      }, this)
    ];
    recordSets.forEach(rs => rs.resolveParent(recordSets));
    return recordSets;
  }

  getGraphicVariables(): GraphicVariable[] {

    // Setup some default _naive_ graphic variable mappings.
    const naiveMappings = {};
    for (const field of this.fields) {
      let types = ['identifier', 'axis', 'text'];
      if (this.fieldTypes[field] === 'integer' || this.fieldTypes[field] === 'number') {
        // These are _guesses_ and not likely correct
        types = types.concat(['areaSize', 'strokeWidth', 'fontSize']);
      }
      if (this.fieldTypes[field] === 'text' || field.toLowerCase().indexOf('color') !== -1) {
        // These are _guesses_ and not likely correct
        types = types.concat(['color', 'strokeColor']);
      }
      // Use the field name as a graphic variable type.
      // Use Case: User formats their csv to have color in color column, etc.
      if (!types.find(t => t === field)) {
        types.push(field);
      }
      naiveMappings[field] = {};
      types.forEach(t => naiveMappings[field][t] = [{selector: field}]);
    }

    return DefaultGraphicVariableMapping.fromJSON([
      {
        recordStream: 'csvData',
        mappings: {
          csvData: naiveMappings
        }
      }
    ], this);
  }

  getGraphicSymbols(): GraphicSymbol[] {
    return [
      new DefaultGraphicSymbol({
        id: 'csvDataPoints',
        type: 'area',
        recordStream: 'csvData',
        graphicVariables: {}
      }, this)
    ];
  }

  getVisualizations(): Visualization[] {
    return [
      new ScatterplotVisualization({
        id: 'SG01',
        template: 'scattergraph',
        properties: {
          enableTooltip: true,
          gridlines: true,
          showAxisLabels: false,
          showAxisIndicators: false
        },
        graphicSymbols: {
          points: 'csvDataPoints'
        }
      }, this)
    ];
  }
}
