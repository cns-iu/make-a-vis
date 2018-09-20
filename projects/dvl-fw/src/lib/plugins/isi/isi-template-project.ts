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
          {id: 'id', label: 'WoS ID', dataType: 'text', scaleType: 'nominal'},
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'authors', label: 'Authors', dataType: 'text', scaleType: 'nominal'},
          {id: 'journalName', label: 'Journal', dataType: 'text', scaleType: 'nominal'},
          {id: 'publicationYear', label: 'Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'}
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
          {id: 'numPapers', label: '#Papers', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '#Cites', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
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
          color: {
            recordSet: 'publication',
            dataVariable: 'publicationYear',
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
          },
        }
      }, this)
    ];
  }

  getVisualizations(): Visualization[] {
    return [
      new DefaultVisualization({
        id: 'SG01',
        template: 'scattergraph',
        properties: {
          drawGridLines: true
        },
        graphicSymbols: {
          points: 'journalPoints'
        }
      }, this),
      new DefaultVisualization({
        id: 'SG02',
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
