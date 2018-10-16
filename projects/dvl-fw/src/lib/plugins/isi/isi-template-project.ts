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
import { ISIDataSource } from './isi-data-source';
import { ISIParsedRawData } from './isi-parsed-raw-data';
import { ActivityLogDataSource } from '../activity-log/log-data-source';
import {
  GeomapVisualization, NetworkVisualization, ScatterplotVisualization,
  SciencemapVisualization, TemporalBargraphVisualization
} from './../ngx-dino/visualizations';


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
    return [parsedData, rawData];
  }

  async prePopulateData() {
    await this.rawData[0].getData();
  }

  getDataSources(): DataSource[] {
    return [
      new ISIDataSource({
        id: 'isiDataSource',
        properties: { rawData: 'isiFile', parsedData: 'isiRawData', saveParsedData: true },
        recordStreams: [{id: 'publications'}, {id: 'journals'}, {id: 'authors'}, {id: 'coAuthorLinks'}]
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
        id: 'publication',
        label: 'Publication',
        labelPlural: 'Publications',
        defaultRecordStream: 'publications',
        dataVariables: [
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'authors', label: 'Authors', dataType: 'text', scaleType: 'nominal'},
          {id: 'journalName', label: 'Journal', dataType: 'text', scaleType: 'nominal'},
          {id: 'publicationYear', label: 'Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'},
          {id: 'id', label: 'WoS ID', dataType: 'text', scaleType: 'nominal'}
        ]
      }, this),
      new DefaultRecordSet({
        id: 'journal',
        label: 'Journal',
        labelPlural: 'Journals',
        defaultRecordStream: 'journals',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '#Papers', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
        ]
      }, this),
      new DefaultRecordSet({
        id: 'author',
        label: 'Author',
        labelPlural: 'Authors',
        defaultRecordStream: 'authors',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'fullname', label: 'Full Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '#Papers', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'latlng', label: 'Latitude/Longitude', dataType: '???', scaleType: '???'}, // TODO: Fix types
          {id: 'position', label: 'Position', dataType: '???', scaleType: '???'}, // TODO: Fix types
          {id: 'shape', label: 'Shape', dataType: 'text', scaleType: 'nominal'},
        ]
      }, this),
      new DefaultRecordSet({
        id: 'coAuthorLink',
        label: 'Co-Author Link',
        labelPlural: 'Co-Author Links',
        defaultRecordStream: 'coAuthorLinks',
        dataVariables: [
          {id: 'author1', label: 'Author 1', dataType: 'text', scaleType: 'nominal'},
          {id: 'author2', label: 'Author 2', dataType: 'text', scaleType: 'nominal'},
          {id: 'identifier', label: 'Identifier', dataType: 'text', scaleType: 'nominal'},
          {id: 'source', label: 'Source Position', dataType: '???', scaleType: '???'}, // TODO: Fix types
          {id: 'target', label: 'Target Position', dataType: '???', scaleType: '???'}, // TODO: Fix types
          {id: 'numPapers', label: '#Papers', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'}
        ]
      }, this)
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
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              areaSize: [
                {selector: 'numCitesAreaSize'}
              ],
              fontSize: [
                {selector: 'numCitesFontSize'}
              ],
              color: [
                {selector: 'numCitesColor'}
              ],
              strokeColor: [
                {selector: 'numCitesStrokeColor'}
              ]
            },
            publicationYear: {
              axis: [
                {selector: 'publicationYearLabel'}
              ],
              text: [
                {selector: 'publicationYearLabel'}
              ],
              areaSize: [
                {selector: 'publicationYearAreaSize'}
              ],
              fontSize: [
                {selector: 'publicationYearFontSize'}
              ],
              color: [
                {selector: 'publicationYearColor'}
              ],
              strokeColor: [
                {selector: 'publicationYearStrokeColor'}
              ]
            },
          }
        }
      },
      {
        recordStream: 'journals',
        mappings: {
          journal: {
            name: {
              identifier: [
                {selector: 'name'}
              ],
              axis: [
                {selector: 'name'}
              ],
              text: [
                {selector: 'name'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              areaSize: [
                {selector: 'numCitesAreaSize'}
              ],
              fontSize: [
                {selector: 'numCitesFontSize'}
              ],
              color: [
                {selector: 'numCitesColor'}
              ],
              strokeColor: [
                {selector: 'numCitesStrokeColor'}
              ]
            },
            numPapers: {
              axis: [
                {selector: 'numPapersLabel'}
              ],
              text: [
                {selector: 'numPapersLabel'}
              ],
              areaSize: [
                {selector: 'numPapersAreaSize'}
              ],
              fontSize: [
                {selector: 'numPapersFontSize'}
              ],
              color: [
                {selector: 'numPapersColor'}
              ],
              strokeColor: [
                {selector: 'numPapersStrokeColor'}
              ]
            },
            firstYear: {
              axis: [
                {selector: 'firstYearLabel'}
              ],
              text: [
                {selector: 'firstYearLabel'}
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
        recordStream: 'authors',
        mappings: {
          author: {
            name: {
              identifier: [
                {selector: 'name'}
              ],
              axis: [
                {selector: 'name'}
              ],
              text: [
                {selector: 'name'}
              ]
            },
            latlng: {
              axis: [
                {selector: 'latlng'}
              ]
            },
            position: {
              axis: [
                {selector: 'position'}
              ]
            },
            shape: {
              identifier: [
                {selector: 'shape'}
              ]
            },
            fullname: {
              identifier: [
                {selector: 'fullname'}
              ],
              axis: [
                {selector: 'fullname'}
              ],
              text: [
                {selector: 'fullname'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              areaSize: [
                {selector: 'numCitesAreaSize'}
              ],
              fontSize: [
                {selector: 'numCitesFontSize'}
              ],
              color: [
                {selector: 'numCitesColor'}
              ],
              strokeColor: [
                {selector: 'numCitesStrokeColor'}
              ]
            },
            numPapers: {
              axis: [
                {selector: 'numPapersLabel'}
              ],
              text: [
                {selector: 'numPapersLabel'}
              ],
              areaSize: [
                {selector: 'numPapersAreaSize'}
              ],
              fontSize: [
                {selector: 'numPapersFontSize'}
              ],
              color: [
                {selector: 'numPapersColor'}
              ],
              strokeColor: [
                {selector: 'numPapersStrokeColor'}
              ]
            },
            firstYear: {
              axis: [
                {selector: 'firstYearLabel'}
              ],
              text: [
                {selector: 'firstYearLabel'}
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
        recordStream: 'coAuthorLinks',
        mappings: {
          coAuthorLink: {
            author1: {
              identifier: [
                {selector: 'author1'}
              ],
              axis: [
                {selector: 'author1'}
              ],
              text: [
                {selector: 'author1'}
              ]
            },
            author2: {
              identifier: [
                {selector: 'author2'}
              ],
              axis: [
                {selector: 'author2'}
              ],
              text: [
                {selector: 'author2'}
              ]
            },
            identifier: {
              identifier: [
                {selector: 'identifier'}
              ]
            },
            source: {
              source: [
                {selector: 'source'}
              ]
            },
            target: {
              target: [
                {selector: 'target'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              areaSize: [
                {selector: 'numCitesAreaSize'}
              ],
              strokeWidth: [
                {selector: 'numCitesStrokeWidth'}
              ],
              fontSize: [
                {selector: 'numCitesFontSize'}
              ],
              color: [
                {selector: 'numCitesColor'}
              ],
              strokeColor: [
                {selector: 'numCitesStrokeColor'}
              ]
            },
            numPapers: {
              axis: [
                {selector: 'numPapersLabel'}
              ],
              text: [
                {selector: 'numPapersLabel'}
              ],
              areaSize: [
                {selector: 'numPapersAreaSize'}
              ],
              strokeWidth: [
                {selector: 'numPapersStrokeWidth'}
              ],
              fontSize: [
                {selector: 'numPapersFontSize'}
              ],
              color: [
                {selector: 'numPapersColor'}
              ],
              strokeColor: [
                {selector: 'numPapersStrokeColor'}
              ]
            },
            firstYear: {
              axis: [
                {selector: 'firstYearLabel'}
              ],
              text: [
                {selector: 'firstYearLabel'}
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
          x: {
            recordSet: 'publication',
            dataVariable: 'publicationYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'publication',
            dataVariable: 'publicationYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'publication',
            dataVariable: 'numCites',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'publication',
            dataVariable: 'numCites',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'journalPoints',
        type: 'area',
        recordStream: 'journals',
        graphicVariables: {
          identifier: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          x: {
            recordSet: 'journal',
            dataVariable: 'firstYear',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'journal',
            dataVariable: 'numPapers',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'journal',
            dataVariable: 'numCites',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'journal',
            dataVariable: 'numCites',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          label: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          labelSize: {
            recordSet: 'journal',
            dataVariable: 'numCites',
            graphicVariableType: 'fontSize',
            graphicVariableId: 'fontSize'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'authorPoints',
        type: 'area',
        recordStream: 'authors',
        graphicVariables: {
          identifier: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          position: {
            recordSet: 'author',
            dataVariable: 'position',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          latlng: {
            recordSet: 'author',
            dataVariable: 'latlng',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          shape: {
            recordSet: 'author',
            dataVariable: 'shape',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          areaSize: {
            recordSet: 'author',
            dataVariable: 'numCites',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'author',
            dataVariable: 'numCites',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'coAuthorLinks',
        type: 'line',
        recordStream: 'coAuthorLinks',
        graphicVariables: {
          identifier: {
            recordSet: 'coAuthorLink',
            dataVariable: 'identifier',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          source: {
            recordSet: 'coAuthorLink',
            dataVariable: 'source',
            graphicVariableType: 'source',
            graphicVariableId: 'source'
          },
          target: {
            recordSet: 'coAuthorLink',
            dataVariable: 'target',
            graphicVariableType: 'target',
            graphicVariableId: 'target'
          },
          strokeWidth: {
            recordSet: 'coAuthorLink',
            dataVariable: 'numPapers',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'strokeWidth'
          },
          strokeColor: {
            recordSet: 'coAuthorLink',
            dataVariable: 'numCites',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'strokeColor'
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
          gridlines: true,
          showAxisLabels: false,
          showAxisIndicators: false
        },
        graphicSymbols: {
          points: 'journalPoints'
        }
      }, this),
      new ScatterplotVisualization({
        id: 'SG02',
        template: 'scattergraph',
        properties: {
          gridlines: true,
          showAxisLabels: false,
          showAxisIndicators: false
        },
        graphicSymbols: {
          points: 'publicationPoints'
        }
      }, this),
      new GeomapVisualization({
        id: 'GM01',
        template: 'geomap',
        properties: {
          stateDefaultColor: 'white',
          stateDefaultStrokeColor: '#bebebe'
        },
        graphicSymbols: {
          points: 'authorPoints'
          // TODO: Add states
        }
      }, this),
      new NetworkVisualization({
        id: 'NW01',
        template: 'network',
        properties: {},
        graphicSymbols: {
          edges: 'coAuthorLinks',
          nodes: 'authorPoints'
        }
      }, this),
      new SciencemapVisualization({
        id: 'SM01',
        template: 'science-map',
        properties: {},
        graphicSymbols: {
          // TODO
        }
      }, this),
      new TemporalBargraphVisualization({
        id: 'TBG01',
        template: 'temporal-bargraph',
        properties: {},
        graphicSymbols: {}
      }, this)
    ];
  }
}
