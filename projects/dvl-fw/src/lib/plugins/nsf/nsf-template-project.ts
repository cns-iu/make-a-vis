// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataSource } from '../../shared/data-source';
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { GraphicVariable } from '../../shared/graphic-variable';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { Visualization } from '../../shared/visualization';
import { ActivityLogDataSource } from '../activity-log/log-data-source';
import { DefaultGraphicSymbol } from '../default/default-graphic-symbol';
import { DefaultGraphicVariableMapping } from '../default/default-graphic-variable';
import { DefaultProject } from '../default/default-project';
import { DefaultRawData } from '../default/default-raw-data';
import { DefaultRecordSet } from '../default/default-record-set';
import {
  ScatterplotVisualization, TemporalBargraphVisualization, NetworkVisualization, GeomapVisualization
} from '../ngx-dino/visualizations';
import { NSFDataSource } from './nsf-data-source';
import { NSFParsedRawData } from './nsf-parsed-raw-data';


export class NSFTemplateProject extends DefaultProject {
  static async create(nsfFileContent: string, fileName?: string): Promise<Project> {
    const project = new NSFTemplateProject(nsfFileContent, fileName);
    await project.prePopulateData();
    return project;
  }

  constructor(nsfFileContent: string, fileName?: string) {
    super();
    this.rawData = this.getRawData(nsfFileContent);
    this.dataSources = this.getDataSources();
    this.recordSets = this.getRecordSets(fileName);
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
        recordStreams: [
          {id: 'awards', label: 'Awards'},
          {id: 'investigators', label: 'Investigators'},
          {id: 'coPiLinks', label: 'Co-PI Links'}
        ]
      }, this),
      new ActivityLogDataSource({
        id: 'activityLog',
        properties: { rawData: 'activityLog', keepPreviousActivity: true, freezeLogs: false },
        recordStreams: [{id: 'activityLog', label: 'Activity Log'}]
      }, this)
    ];
  }

  getRecordSets(fileName?: string): RecordSet[] {
    const recordSets = [
      new DefaultRecordSet({
        id: 'award',
        label: 'NSF Award',
        labelPlural: 'NSF Awards',
        description: fileName || undefined,
        defaultRecordStream: 'awards',
        dataVariables: [
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'investigators', label: 'Investigators', dataType: 'text', scaleType: 'nominal'},
          {id: 'startYear', label: 'Start Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'endYear', label: 'End Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'awardedAmount', label: '$Awarded', dataType: 'integer', scaleType: 'ratio'},
          {id: 'awardInstrument', label: 'Award Instrument', dataType: 'text', scaleType: 'nominal'},
          {id: 'organization', label: 'Organization', dataType: 'text', scaleType: 'nominal'},
          {id: 'nsfOrganization', label: 'NSF Org.', dataType: 'text', scaleType: 'nominal'},
          {id: 'nsfPrograms', label: 'NSF Program(s)', dataType: 'text', scaleType: 'nominal'},
          {id: 'id', label: 'ID', dataType: 'text', scaleType: 'nominal'}
        ]
      }, this),
      new DefaultRecordSet({
        id: 'investigator',
        label: 'Investigator',
        labelPlural: 'Investigators',
        parent: 'award',
        description: 'from NSF Awards',
        defaultRecordStream: 'investigators',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numAwards', label: '# Awards', dataType: 'integer', scaleType: 'ratio'},
          {id: 'awardedAmount', label: '$Awarded', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'x', label: 'X', dataType: 'number', scaleType: 'interval'},
          {id: 'y', label: 'Y', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude', label: 'Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude', label: 'Longitude', dataType: 'number', scaleType: 'interval'}
        ]
      }, this),
      new DefaultRecordSet({
        id: 'coPiLink',
        label: 'Co-PI Link',
        labelPlural: 'Co-PI Links',
        parent: 'award',
        description: 'from NSF Awards',
        defaultRecordStream: 'coPiLinks',
        dataVariables: [
          {id: 'investigator1', label: 'Investigator 1', dataType: 'text', scaleType: 'nominal'},
          {id: 'investigator2', label: 'Investigator 2', dataType: 'text', scaleType: 'nominal'},
          {id: 'numAwards', label: '# Joint Awards', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'identifier', label: 'Identifier', dataType: 'text', scaleType: 'nominal'},
          {id: 'sourceX', label: 'Source X', dataType: 'number', scaleType: 'interval'},
          {id: 'sourceY', label: 'Source Y', dataType: 'number', scaleType: 'interval'},
          {id: 'targetX', label: 'Target X', dataType: 'number', scaleType: 'interval'},
          {id: 'targetY', label: 'Target Y', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude1', label: 'Source Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude1', label: 'Source Longitude', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude2', label: 'Target Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude2', label: 'Target Longitude', dataType: 'number', scaleType: 'interval'},
        ]
      }, this),
    ];
    recordSets.forEach(rs => rs.resolveParent(recordSets));
    return recordSets;
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
              ],
              transparency: [
                {id: 'fixed', selector: 'defaultStyles.transparency', label: 'Default'}
              ],
              strokeColor: [
                {id: 'fixed', selector: 'defaultStyles.strokeColor', label: 'Default'}
              ],
              strokeWidth: [
                {id: 'fixed', selector: 'defaultStyles.strokeWidth', label: 'Default'}
              ],
              strokeTransparency: [
                {id: 'fixed', selector: 'defaultStyles.strokeTransparency', label: 'Default'}
              ],
              labelPosition: [
                {id: 'fixed', selector: 'defaultStyles.labelPosition', label: 'Default'}
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
            awardInstrument: {
              axis: [
                {selector: 'awardInstrument'}
              ],
              text: [
                {selector: 'awardInstrument'}
              ],
              color: [
                {selector: 'awardInstrumentColor'}
              ]
            },
            startYear: {
              axis: [
                {selector: 'startYear'}
              ],
              text: [
                {selector: 'startYearLabel'}
              ],
              input: [
                {selector: 'startYear'}
              ],
              label: [
                {selector: 'startYearLabel'}
              ],
              order: [
                {selector: 'startYear'},
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
                {selector: 'endYear'}
              ],
              text: [
                {selector: 'endYearLabel'}
              ],
              input: [
                {selector: 'endYear'}
              ],
              label: [
                {selector: 'endYearLabel'}
              ],
              order: [
                {selector: 'endYear'},
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
                {selector: 'awardedAmountToDate'}
              ],
              text: [
                {selector: 'awardedAmountLabel'}
              ],
              input: [
                {selector: 'awardedAmountToDate'}
              ],
              label: [
                {selector: 'awardedAmountLabel'}
              ],
              order: [
                {selector: 'awardedAmountToDate'},
              ],
              areaSize: [
                {selector: 'awardedAmountAreaSize'}
              ],
              strokeWidth: [
                {selector: 'awardedAmountStrokeWidth'}
              ],
              fontSize: [
                {selector: 'awardedAmountFontSize'}
              ],
              color: [
                {selector: 'awardedAmountColor'}
              ],
              strokeColor: [
                {selector: 'awardedAmountStrokeColor'}
              ],
              transparency: [
                {selector: 'awardedAmountTransparency'}
              ],
              strokeTransparency: [
                {selector: 'awardedAmountTransparency'}
              ],
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
        },
      },
      {
        recordStream: 'investigators',
        mappings: {
          investigator: {
            name: {
              identifier: [
                {selector: 'name'}
              ],
              axis: [
                {selector: 'name'}
              ],
              text: [
                {selector: 'name'}
              ],
              transparency: [
                {id: 'fixed', selector: 'defaultStyles.transparency', label: 'Default'}
              ],
              strokeColor: [
                {id: 'fixed', selector: 'defaultStyles.strokeColor', label: 'Default'}
              ],
              strokeWidth: [
                {id: 'fixed', selector: 'defaultStyles.strokeWidth', label: 'Default'}
              ],
              strokeTransparency: [
                {id: 'fixed', selector: 'defaultStyles.strokeTransparency', label: 'Default'}
              ]
            },
            latitude: {
              text: [
                {selector: 'latlng[0]'}
              ],
              axis: [
                {selector: 'latlng[0]'}
              ]
            },
            longitude: {
              text: [
                {selector: 'latlng[1]'}
              ],
              axis: [
                {selector: 'latlng[1]'}
              ]
            },
            x: {
              text: [
                {selector: 'position[0]'}
              ],
              axis: [
                {selector: 'position[0]'}
              ]
            },
            y: {
              text: [
                {selector: 'position[1]'}
              ],
              axis: [
                {selector: 'position[1]'}
              ]
            },
            numAwards: {
              axis: [
                {selector: 'numAwardsLabel'}
              ],
              text: [
                {selector: 'numAwardsLabel'}
              ],
              input: [
                {selector: 'numAwards'}
              ],
              label: [
                {selector: 'numAwardsLabel'}
              ],
              order: [
                {selector: 'numAwards'},
              ],
              areaSize: [
                {selector: 'numAwardsAreaSize'}
              ],
              fontSize: [
                {selector: 'numAwardsFontSize'}
              ],
              color: [
                {selector: 'numAwardsColor'}
              ],
              strokeColor: [
                {selector: 'numAwardsStrokeColor'}
              ],
              transparency: [
                {selector: 'numAwardsTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numAwardsTransparency'}
              ]
            },
            awardedAmount: {
              axis: [
                {selector: 'awardedAmountToDate'}
              ],
              text: [
                {selector: 'awardedAmountLabel'}
              ],
              input: [
                {selector: 'awardedAmountToDate'}
              ],
              label: [
                {selector: 'awardedAmountLabel'}
              ],
              order: [
                {selector: 'awardedAmountToDate'},
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
              ],
              transparency: [
                {selector: 'awardedAmountTransparency'}
              ],
              strokeTransparency: [
                {selector: 'awardedAmountTransparency'}
              ],
            },
            firstYear: {
              axis: [
                {selector: 'firstYearLabel'}
              ],
              text: [
                {selector: 'firstYearLabel'}
              ],
              input: [
                {selector: 'firstYear'}
              ],
              label: [
                {selector: 'firstYearLabel'}
              ],
              order: [
                {selector: 'firstYear'},
              ],
              areaSize: [
                {selector: 'firstYearAreaSize'}
              ],
              fontSize: [
                {selector: 'firstYearFontSize'}
              ],
              color: [
                {selector: 'firstYearColor'}
              ],
              strokeColor: [
                {selector: 'firstYearStrokeColor'}
              ]
            },
            lastYear: {
              axis: [
                {selector: 'lastYearLabel'}
              ],
              text: [
                {selector: 'lastYearLabel'}
              ],
              input: [
                {selector: 'lastYear'}
              ],
              label: [
                {selector: 'lastYearLabel'}
              ],
              order: [
                {selector: 'lastYear'},
              ],
              areaSize: [
                {selector: 'lastYearAreaSize'}
              ],
              fontSize: [
                {selector: 'lastYearFontSize'}
              ],
              color: [
                {selector: 'lastYearColor'}
              ],
              strokeColor: [
                {selector: 'lastYearStrokeColor'}
              ]
            }
          }
        }
      },
      {
        recordStream: 'coPiLinks',
        mappings: {
          coPiLink: {
            investigator1: {
              identifier: [
                {selector: 'investigator1'}
              ],
              axis: [
                {selector: 'investigator1'}
              ],
              text: [
                {selector: 'investigator1'}
              ]
            },
            investigator2: {
              identifier: [
                {selector: 'investigator2'}
              ],
              axis: [
                {selector: 'investigator2'}
              ],
              text: [
                {selector: 'investigator2'}
              ]
            },
            identifier: {
              identifier: [
                {selector: 'identifier'}
              ],
              transparency: [
                {id: 'fixed', selector: 'defaultStyles.transparency', label: 'Default'}
              ],
              strokeColor: [
                {id: 'fixed', selector: 'defaultStyles.strokeColor', label: 'Default'}
              ],
              strokeWidth: [
                {id: 'fixed', selector: 'defaultStyles.strokeWidth', label: 'Default'}
              ],
              strokeTransparency: [
                {id: 'fixed', selector: 'defaultStyles.strokeTransparency', label: 'Default'}
              ]
            },
            sourceX: {
              text: [
                {selector: 'source[0]'}
              ],
              axis: [
                {selector: 'source[0]'}
              ]
            },
            sourceY: {
              text: [
                {selector: 'source[1]'}
              ],
              axis: [
                {selector: 'source[1]'}
              ]
            },
            targetX: {
              text: [
                {selector: 'target[0]'}
              ],
              axis: [
                {selector: 'target[0]'}
              ]
            },
            targetY: {
              text: [
                {selector: 'target[1]'}
              ],
              axis: [
                {selector: 'target[1]'}
              ]
            },
            latitude1: {
              text: [
                {selector: 'Investigator1.latlng[0]'}
              ],
              axis: [
                {selector: 'Investigator1.latlng[0]'}
              ]
            },
            longitude1: {
              text: [
                {selector: 'Investigator1.latlng[1]'}
              ],
              axis: [
                {selector: 'Investigator1.latlng[1]'}
              ]
            },
            latitude2: {
              text: [
                {selector: 'Investigator2.latlng[0]'}
              ],
              axis: [
                {selector: 'Investigator2.latlng[0]'}
              ]
            },
            longitude2: {
              text: [
                {selector: 'Investigator2.latlng[1]'}
              ],
              axis: [
                {selector: 'Investigator2.latlng[1]'}
              ]
            },
            numAwards: {
              axis: [
                {selector: 'numAwardsLabel'}
              ],
              text: [
                {selector: 'numAwardsLabel'}
              ],
              input: [
                {selector: 'numAwards'}
              ],
              label: [
                {selector: 'numAwardsLabel'}
              ],
              order: [
                {selector: 'numAwards'},
              ],
              areaSize: [
                {selector: 'numAwardsAreaSize'}
              ],
              strokeWidth: [
                {selector: 'numAwardsStrokeWidth'}
              ],
              fontSize: [
                {selector: 'numAwardsFontSize'}
              ],
              color: [
                {selector: 'numAwardsColor'}
              ],
              transparency: [
                {selector: 'numAwardsTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numAwardsTransparency'}
              ],
              strokeColor: [
                {selector: 'numAwardsStrokeColor'}
              ]
            },
            firstYear: {
              axis: [
                {selector: 'firstYearLabel'}
              ],
              text: [
                {selector: 'firstYearLabel'}
              ],
              input: [
                {selector: 'firstYear'}
              ],
              label: [
                {selector: 'firstYearLabel'}
              ],
              order: [
                {selector: 'firstYear'},
              ],
              areaSize: [
                {selector: 'firstYearAreaSize'}
              ],
              strokeWidth: [
                {selector: 'firstYearStrokeWidth'}
              ],
              fontSize: [
                {selector: 'firstYearFontSize'}
              ],
              color: [
                {selector: 'firstYearColor'}
              ],
              strokeColor: [
                {selector: 'firstYearStrokeColor'}
              ]
            },
            lastYear: {
              axis: [
                {selector: 'lastYearLabel'}
              ],
              text: [
                {selector: 'lastYearLabel'}
              ],
              input: [
                {selector: 'lastYear'}
              ],
              label: [
                {selector: 'lastYearLabel'}
              ],
              order: [
                {selector: 'lastYear'},
              ],
              areaSize: [
                {selector: 'lastYearAreaSize'}
              ],
              strokeWidth: [
                {selector: 'lastYearStrokeWidth'}
              ],
              fontSize: [
                {selector: 'lastYearFontSize'}
              ],
              color: [
                {selector: 'lastYearColor'}
              ],
              strokeColor: [
                {selector: 'lastYearStrokeColor'}
              ]
            }
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
          x: {
            recordSet: 'award',
            dataVariable: 'startYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'award',
            dataVariable: 'endYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          'x-start': {
            recordSet: 'award',
            dataVariable: 'startYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          'x-end': {
            recordSet: 'award',
            dataVariable: 'endYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'award',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          height: {
            recordSet: 'award',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          'y-order': {
            recordSet: 'award',
            dataVariable: 'startYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          color: {
            recordSet: 'award',
            dataVariable: 'awardInstrument',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'award',
            dataVariable: 'nsfPrograms',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          label: {
            recordSet: 'award',
            dataVariable: 'title',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          labelPosition: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'labelPosition',
            graphicVariableId: 'fixed'
          },
          transparency: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'award',
            dataVariable: 'id',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'investigatorPoints',
        type: 'area',
        recordStream: 'investigators',
        graphicVariables: {
          identifier: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          latitude: {
            recordSet: 'investigator',
            dataVariable: 'latitude',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude: {
            recordSet: 'investigator',
            dataVariable: 'longitude',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          x: {
            recordSet: 'investigator',
            dataVariable: 'x',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'investigator',
            dataVariable: 'y',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'investigator',
            dataVariable: 'awardedAmount',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'investigator',
            dataVariable: 'firstYear',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          transparency: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'investigator',
            dataVariable: 'name',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'coPiLinks',
        type: 'line',
        recordStream: 'coPiLinks',
        graphicVariables: {
          identifier: {
            recordSet: 'coPiLink',
            dataVariable: 'identifier',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          sourceX: {
            recordSet: 'coPiLink',
            dataVariable: 'sourceX',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          sourceY: {
            recordSet: 'coPiLink',
            dataVariable: 'sourceY',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          targetX: {
            recordSet: 'coPiLink',
            dataVariable: 'targetX',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          targetY: {
            recordSet: 'coPiLink',
            dataVariable: 'targetY',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          latitude1: {
            recordSet: 'coPiLink',
            dataVariable: 'latitude1',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude1: {
            recordSet: 'coPiLink',
            dataVariable: 'longitude1',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          latitude2: {
            recordSet: 'coPiLink',
            dataVariable: 'latitude2',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude2: {
            recordSet: 'coPiLink',
            dataVariable: 'longitude2',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          strokeWidth: {
            recordSet: 'coPiLink',
            dataVariable: 'numAwards',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'strokeWidth'
          },
          strokeColor: {
            recordSet: 'coPiLink',
            dataVariable: 'firstYear',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'coPiLink',
            dataVariable: 'identifier',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          transparency: {
            recordSet: 'coPiLink',
            dataVariable: 'identifier',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'coPiLink',
            dataVariable: 'identifier',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          }
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
          enableTooltip: true,
          gridlines: true,
          showAxisLabels: false,
          showAxisIndicators: false
        },
        graphicSymbols: {
          points: 'awardPoints'
        }
      }, this),
      new GeomapVisualization({
        id: 'GM01',
        template: 'geomap',
        properties: {
          basemapSelectedZoomLevel: 1,
          basemapDefaultColor: 'white',
          basemapDefaultStrokeColor: '#bebebe'
        },
        graphicSymbols: {
          edges: 'coPiLinks',
          nodes: 'investigatorPoints'
        }
      }, this),
      new NetworkVisualization({
        id: 'NW01',
        template: 'network',
        properties: {},
        graphicSymbols: {
          edges: 'coPiLinks',
          nodes: 'investigatorPoints'
        }
      }, this),
      new TemporalBargraphVisualization({
        id: 'TBG01',
        template: 'temporal-bargraph',
        properties: {},
        graphicSymbols: {
          bars: 'awardPoints'
        }
      }, this)
    ];
  }
}
