import { DataSource } from '../../shared/data-source';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { DefaultGraphicVariableMapping } from '../default/default-graphic-variable';
import { DefaultProject } from '../default/default-project';
import { DefaultVisualization } from '../default/default-visualization';
import { GraphicSymbol } from './../../shared/graphic-symbol';
import { GraphicVariable } from './../../shared/graphic-variable';
import { Visualization } from './../../shared/visualization';
import { DefaultGraphicSymbol } from './../default/default-graphic-symbol';
import { DefaultRawData } from './../default/default-raw-data';
import { DefaultRecordSet } from './../default/default-record-set';
import { ISIDataSource } from './isi-data-source';
import { ISIParsedRawData } from './isi-parsed-raw-data';


export class ISITemplateProject extends DefaultProject {
  static async create(isiFileContent: string): Promise<Project> {
    const project = new ISITemplateProject(isiFileContent);
    await project.prePopulateData();
    return project;
  }

  constructor(isiFileContent: string) {
    super();
    this.rawData = this.getRawData(isiFileContent);
    this.dataSources = this.getDataSources();
    this.recordSets = this.getRecordSets();
    this.graphicVariables = this.getGraphicVariables();
    this.graphicSymbols = this.getGraphicSymbols();
    this.visualizations = this.getVisualizations();
  }

  getRawData(isiFileContent: string): RawData[] {
    const rawData = new DefaultRawData({id: 'isiFile', template: 'string', data: isiFileContent});
    const parsedData = new ISIParsedRawData('isiRawData', rawData);
    return [rawData, parsedData];
  }

  async prePopulateData() {
    await this.rawData[1].getData();
  }

  getDataSources(): DataSource[] {
    return [
      new ISIDataSource({
        id: 'isiDataSource',
        properties: { rawData: 'isiFile', parsedData: 'isiRawData', saveParsedData: true },
        recordStreams: [{id: 'publications'}] // , 'authors', 'coAuthorLinks']
      }, this)
    ];
  }

  getRecordSets(): RecordSet[] {
    return [
      new DefaultRecordSet({
        id: 'publication',
        label: 'Publication',
        labelPlural: 'Publications',
        dataVariables: [
          {id: 'id', label: 'WoS ID', dataType: 'text', scaleType: 'nominal'},
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'authors', label: 'Authors', dataType: 'text', scaleType: 'nominal'},
          {id: 'year', label: 'Year', dataType: 'integer', scaleType: 'interval'},
        ]
      })
    ];
  }

  getGraphicVariables(): GraphicVariable[] {
    return DefaultGraphicVariableMapping.fromJSON([
      {
        recordStream: 'publications',
        mappings: {
          publication: {
            id: {
              identifier: [
                {selector: 'id'}
              ]
            },
            year: {
              axis: [
                {selector: 'year'}
              ],
              text: [
                {selector: 'year'}
              ],
              color: [
                {selector: 'year'}
              ],
              size: [
                {selector: 'year'}
              ],
            }
          }
        }
      }
    ], this);
  }

  getGraphicSymbols(): GraphicSymbol[] {
    return [new DefaultGraphicSymbol({
      id: 'publicationPoints',
      type: 'area',
      recordStream: 'publications',
      graphicVariables: {
        identifier: {
          recordSet: 'publication',
          dataVariable: 'id',
          graphicVariableType: 'identifier',
          graphicVariableId: 'identifier'
        },
        color: {
          recordSet: 'publication',
          dataVariable: 'year',
          graphicVariableType: 'color',
          graphicVariableId: 'color'
        }
      }
    }, this)];
  }

  getVisualizations(): Visualization[] {
    return [
      new DefaultVisualization({
        id: 'scattergraph1',
        template: 'scattergraph',
        properties: {
          drawGridLines: true
        },
        graphicSymbols: {
          points: 'publicationPoints'
        }
      }, this)
    ];
  }
}
