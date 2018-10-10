import { ActivityLogDataSource } from './../activity-log/log-data-source';
import { ScatterplotVisualization } from './../ngx-dino/components/scatterplot/scatterplot-visualization';
import { DataSource } from '../../shared/data-source';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { DefaultGraphicVariableMapping } from '../default/default-graphic-variable';
import { DefaultProject } from '../default/default-project';
import { GraphicSymbol } from './../../shared/graphic-symbol';
import { GraphicVariable } from './../../shared/graphic-variable';
import { Visualization } from './../../shared/visualization';
import { DefaultGraphicSymbol } from './../default/default-graphic-symbol';
import { DefaultRawData } from './../default/default-raw-data';
import { DefaultRecordSet } from './../default/default-record-set';
import { NSFDataSource } from './nsf-data-source';
import { NSFParsedRawData } from './nsf-parsed-raw-data';


export class NSFTemplateProject extends DefaultProject {
  static async create(nsfFileContent: string): Promise<Project> {
    const project = new NSFTemplateProject(nsfFileContent);
    await project.prePopulateData();
    return project;
  }

  constructor(nsfFileContent: string) {
    super();
    this.rawData = this.getRawData(nsfFileContent);
    this.dataSources = this.getDataSources();
    this.recordSets = this.getRecordSets();
    this.graphicVariables = this.getGraphicVariables();
    this.graphicSymbols = this.getGraphicSymbols();
    this.visualizations = this.getVisualizations();
  }

  getRawData(nsfFileContent: string): RawData[] {
    const rawData = new DefaultRawData({id: 'nsfFile', template: 'string', data: nsfFileContent});
    const parsedData = new NSFParsedRawData('nsfRawData', rawData);
    return [parsedData, rawData];
  }

  async prePopulateData() {
    await this.rawData[0].getData();
  }

  getDataSources(): DataSource[] {
    return [
      new NSFDataSource({
        id: 'nsfDataSource',
        properties: { rawData: 'nsfFile', parsedData: 'nsfRawData', saveParsedData: true },
        recordStreams: [{id: 'awards'}]
      }, this),
      new ActivityLogDataSource({
        id: 'activityLog',
        properties: { rawData: 'activityLog', keepPreviousActivity: true, freezeLogs: false },
        recordStreams: [{id: 'activityLog'}]
      }, this)
    ];
  }

  getRecordSets(): RecordSet[] {
    return [
      new DefaultRecordSet({
        id: 'award',
        label: 'Award',
        labelPlural: 'Awards',
        defaultRecordStream: 'awards',
        dataVariables: [
          {id: 'id', label: 'ID', dataType: 'text', scaleType: 'nominal'},
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'investigators', label: 'Investigators', dataType: 'text', scaleType: 'nominal'},
          {id: 'startYear', label: 'Start Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'endYear', label: 'End Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'awardedAmount', label: '$Awarded', dataType: 'integer', scaleType: 'ratio'},
          {id: 'organization', label: 'Organization', dataType: 'text', scaleType: 'nominal'},
          {id: 'nsfOrganization', label: 'NSF Org.', dataType: 'text', scaleType: 'nominal'},
          {id: 'nsfPrograms', label: 'NSF Program(s)', dataType: 'text', scaleType: 'nominal'},
        ]
      }, this)
    ];
  }

  getGraphicVariables(): GraphicVariable[] {
    return DefaultGraphicVariableMapping.fromJSON([
      {
        recordStream: 'awards',
        mappings: {
          award: {
            id: {
              identifier: [
                {selector: 'id'}
              ]
            },
            title: {
              identifier: [
                {selector: 'id'}
              ],
              axis: [
                {selector: 'title'}
              ],
              text: [
                {selector: 'title'}
              ]
            },
            investigators: {
              axis: [
                {selector: 'investigatorNames[0]', label: 'Primary Investigator'}
              ],
              text: [
                {selector: 'investigatorNames[0]', label: 'Primary Investigator'}
              ]
            },
            startYear: {
              axis: [
                {selector: 'startYearLabel'}
              ],
              text: [
                {selector: 'startYearLabel'}
              ],
              areaSize: [
                {selector: 'startYearAreaSize'}
              ],
              fontSize: [
                {selector: 'startYearFontSize'}
              ],
              color: [
                {selector: 'startYearColor'}
              ],
              strokeColor: [
                {selector: 'startYearStrokeColor'}
              ]
            },
            endYear: {
              axis: [
                {selector: 'endYearLabel'}
              ],
              text: [
                {selector: 'endYearLabel'}
              ],
              areaSize: [
                {selector: 'endYearAreaSize'}
              ],
              fontSize: [
                {selector: 'endYearFontSize'}
              ],
              color: [
                {selector: 'endYearColor'}
              ],
              strokeColor: [
                {selector: 'endYearStrokeColor'}
              ]
            },
            awardedAmount: {
              axis: [
                {selector: 'awardedAmountLabel'}
              ],
              text: [
                {selector: 'awardedAmountLabel'}
              ],
              areaSize: [
                {selector: 'awardedAmountAreaSize'}
              ],
              fontSize: [
                {selector: 'awardedAmountFontSize'}
              ],
              color: [
                {selector: 'awardedAmountColor'}
              ],
              strokeColor: [
                {selector: 'awardedAmountStrokeColor'}
              ]
            },
            organization: {
              axis: [
                {selector: 'organization.name'}
              ],
              text: [
                {selector: 'organization.name'}
              ]
            },
            nsfOrganization: {
              axis: [
                {selector: 'nsfOrganization'}
              ],
              text: [
                {selector: 'nsfOrganization'}
              ]
            },
            nsfPrograms: {
              axis: [
                {selector: 'nsfPrograms[0]', label: 'Primary NSF Program'}
              ],
              text: [
                {selector: 'nsfPrograms[0]', label: 'Primary NSF Program'}
              ]
            },
          }
        }
      }
    ], this);
  }

  getGraphicSymbols(): GraphicSymbol[] {
    return [
      new DefaultGraphicSymbol({
        id: 'awardPoints',
        type: 'area',
        recordStream: 'awards',
        graphicVariables: {
          identifier: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          color: {
            recordSet: 'award',
            dataVariable: 'startYear',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          x: {
            recordSet: 'award',
            dataVariable: 'startYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'award',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'award',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          label: {
            recordSet: 'award',
            dataVariable: 'title',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          labelSize: {
            recordSet: 'award',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'fontSize',
            graphicVariableId: 'fontSize'
          },
        }
      }, this)
    ];
  }

  getVisualizations(): Visualization[] {
    return [
      new ScatterplotVisualization({
        id: 'SG01',
        template: 'scattergraph',
        properties: {
          drawGridLines: true
        },
        graphicSymbols: {
          points: 'awardPoints'
        }
      }, this)
    ];
  }
}
