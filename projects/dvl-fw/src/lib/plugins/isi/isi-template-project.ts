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
  GeomapVisualization, NetworkVisualization, ScatterplotVisualization, SciencemapVisualization, TemporalBargraphVisualization
} from '../ngx-dino/visualizations';
import { ISIDataSource } from './isi-data-source';
import { ISIParsedRawData } from './isi-parsed-raw-data';


export class ISITemplateProject extends DefaultProject {
  static async create(isiFileContent: string, fileName?: string): Promise<Project> {
    const project = new ISITemplateProject(isiFileContent, fileName);
    await project.prePopulateData();
    return project;
  }

  constructor(isiFileContent: string, fileName?: string) {
    super();
    this.rawData = this.getRawData(isiFileContent);
    this.dataSources = this.getDataSources();
    this.recordSets = this.getRecordSets(fileName);
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
        recordStreams: [
          {id: 'publications', label: 'Publications'},
          {id: 'journals', label: 'Journals'},
          {id: 'authors', label: 'Authors'},
          {id: 'coAuthorLinks', label: 'Co-Author Links'},
          {id: 'subdisciplines', label: 'Subdisciplines'}
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
        id: 'publication',
        label: 'ISI Publication',
        labelPlural: 'ISI Publications',
        description: fileName || undefined,
        defaultRecordStream: 'publications',
        dataVariables: [
          {id: 'title', label: 'Title', dataType: 'text', scaleType: 'nominal'},
          {id: 'authors', label: 'Authors', dataType: 'text', scaleType: 'nominal'},
          {id: 'journalName', label: 'Journal', dataType: 'text', scaleType: 'nominal'},
          {id: 'publicationYear', label: 'Publication Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'numCites', label: '# Citations', dataType: 'integer', scaleType: 'ratio'},
          {id: 'discipline', label: 'Discipline', dataType: 'text', scaleType: 'nominal'},
          {id: 'subdiscipline', label: 'Subdiscipline', dataType: 'text', scaleType: 'nominal'},
          {id: 'id', label: 'WoS ID', dataType: 'text', scaleType: 'nominal'}
        ]
      }, this),
      new DefaultRecordSet({
        id: 'journal',
        label: 'Journal',
        labelPlural: 'Journals',
        parent: 'publication',
        description: 'from ISI Publications',
        defaultRecordStream: 'journals',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '# Publications', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '# Citations', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
        ]
      }, this),
      new DefaultRecordSet({
        id: 'author',
        label: 'Author',
        labelPlural: 'Authors',
        parent: 'publication',
        description: 'from ISI Publications',
        defaultRecordStream: 'authors',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '# Publications', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '# Citations', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'fullname', label: 'Full Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'x', label: 'X', dataType: 'number', scaleType: 'interval'},
          {id: 'y', label: 'Y', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude', label: 'Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude', label: 'Longitude', dataType: 'number', scaleType: 'interval'}
        ]
      }, this),
      new DefaultRecordSet({
        id: 'coAuthorLink',
        label: 'Co-Author Link',
        labelPlural: 'Co-Author Links',
        parent: 'publication',
        description: 'from ISI Publications',
        defaultRecordStream: 'coAuthorLinks',
        dataVariables: [
          {id: 'author1', label: 'Author 1', dataType: 'text', scaleType: 'nominal'},
          {id: 'author2', label: 'Author 2', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '# Joint Publications', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '# Joint Citations', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'identifier', label: 'Identifier', dataType: 'text', scaleType: 'nominal'},
          {id: 'sourceX', label: 'Author 1 X', dataType: 'number', scaleType: 'interval'},
          {id: 'sourceY', label: 'Author 1 Y', dataType: 'number', scaleType: 'interval'},
          {id: 'targetX', label: 'Author 2 X', dataType: 'number', scaleType: 'interval'},
          {id: 'targetY', label: 'Author 2 Y', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude1', label: 'Author 1 Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude1', label: 'Author 1 Longitude', dataType: 'number', scaleType: 'interval'},
          {id: 'latitude2', label: 'Author 2 Latitude', dataType: 'number', scaleType: 'interval'},
          {id: 'longitude2', label: 'Author 2 Longitude', dataType: 'number', scaleType: 'interval'},
        ]
      }, this),
      new DefaultRecordSet({
        id: 'subdiscipline',
        label: 'Subdiscipline',
        labelPlural: 'Subdisciplines',
        parent: 'publication',
        description: 'from ISI Publications',
        defaultRecordStream: 'subdisciplines',
        dataVariables: [
          {id: 'name', label: 'Name', dataType: 'text', scaleType: 'nominal'},
          {id: 'numPapers', label: '# Publications', dataType: 'integer', scaleType: 'ratio'},
          {id: 'numCites', label: '# Citations', dataType: 'integer', scaleType: 'ratio'},
          {id: 'firstYear', label: 'First Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'lastYear', label: 'Last Year', dataType: 'integer', scaleType: 'interval'},
          {id: 'discipline', label: 'Discipline', dataType: 'text', scaleType: 'nominal'},
          {id: 'id', label: 'ID', dataType: 'text', scaleType: 'nominal'},
        ]
      }, this)
    ];
    recordSets.forEach(rs => rs.resolveParent(recordSets));
    return recordSets;
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
            title: {
              axis: [
                {selector: 'title'}
              ],
              text: [
                {selector: 'title'}
              ]
            },
            authors: {
              text: [
                {selector: 'authorsLabel'}
              ]
            },
            discipline: {
              text: [
                {selector: 'Journal.Subdiscipline.Discipline.name'}
              ],
              axis: [
                {selector: 'Journal.Subdiscipline.Discipline.name'}
              ],
              input: [
                {selector: 'Journal.Subdiscipline.Discipline.name'}
              ],
              label: [
                {selector: 'Journal.Subdiscipline.Discipline.name'}
              ],
              order: [
                {selector: 'Journal.Subdiscipline.Discipline.id'},
              ],
              color: [
                {selector: 'Journal.Subdiscipline.Discipline.color'}
              ]
            },
            subdiscipline: {
              text: [
                {selector: 'Journal.Subdiscipline.name'}
              ],
              axis: [
                {selector: 'Journal.Subdiscipline.name'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              input: [
                {selector: 'numCites'}
              ],
              label: [
                {selector: 'numCitesLabel'}
              ],
              order: [
                {selector: 'numCites'},
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
              ],
              transparency: [
                {selector: 'numCitesTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numCitesTransparency'}
              ],
            },
            publicationYear: {
              axis: [
                {selector: 'publicationYearLabel'}
              ],
              text: [
                {selector: 'publicationYearLabel'}
              ],
              input: [
                {selector: 'publicationYear'}
              ],
              label: [
                {selector: 'publicationYearLabel'}
              ],
              order: [
                {selector: 'publicationYear'},
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
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              input: [
                {selector: 'numCites'}
              ],
              label: [
                {selector: 'numCitesLabel'}
              ],
              order: [
                {selector: 'numCites'},
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
              input: [
                {selector: 'numPapers'}
              ],
              label: [
                {selector: 'numPapersLabel'}
              ],
              order: [
                {selector: 'numPapers'},
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
              transparency: [
                {selector: 'numPapersTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numPapersTransparency'}
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
        recordStream: 'subdisciplines',
        mappings: {
          subdiscipline: {
            id: {
              identifier: [
                {selector: 'id'}
              ],
              axis: [
                {selector: 'id'}
              ],
              text: [
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
              ]
            },
            name: {
              identifier: [
                {selector: 'name'}
              ],
              axis: [
                {selector: 'name'}
              ],
              text: [
                {selector: 'name'},
                {id: 'tooltip', selector: 'id'}, // FIXME: should be name, but @ngx-din/science-map's "tooltip" has to be id
              ]
            },
            discipline: {
              text: [
                {selector: 'Discipline.name'}
              ],
              axis: [
                {selector: 'Discipline.name'}
              ],
              input: [
                {selector: 'Discipline.name'}
              ],
              label: [
                {selector: 'Discipline.name'}
              ],
              order: [
                {selector: 'Discipline.id'},
              ],
              color: [
                {selector: 'Discipline.color'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              input: [
                {selector: 'numCites'}
              ],
              label: [
                {selector: 'numCitesLabel'}
              ],
              order: [
                {selector: 'numCites'},
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
              input: [
                {selector: 'numPapers'}
              ],
              label: [
                {selector: 'numPapersLabel'}
              ],
              order: [
                {selector: 'numPapers'},
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
              transparency: [
                {selector: 'numPapersTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numPapersTransparency'}
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
              input: [
                {selector: 'numCites'}
              ],
              label: [
                {selector: 'numCitesLabel'}
              ],
              order: [
                {selector: 'numCites'},
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
              input: [
                {selector: 'numPapers'}
              ],
              label: [
                {selector: 'numPapersLabel'}
              ],
              order: [
                {selector: 'numPapers'},
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
              ],
              transparency: [
                {selector: 'numPapersTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numPapersTransparency'}
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
                {selector: 'Author1.latlng[0]'}
              ],
              axis: [
                {selector: 'Author1.latlng[0]'}
              ]
            },
            longitude1: {
              text: [
                {selector: 'Author1.latlng[1]'}
              ],
              axis: [
                {selector: 'Author1.latlng[1]'}
              ]
            },
            latitude2: {
              text: [
                {selector: 'Author2.latlng[0]'}
              ],
              axis: [
                {selector: 'Author2.latlng[0]'}
              ]
            },
            longitude2: {
              text: [
                {selector: 'Author2.latlng[1]'}
              ],
              axis: [
                {selector: 'Author2.latlng[1]'}
              ]
            },
            numCites: {
              axis: [
                {selector: 'numCitesLabel'}
              ],
              text: [
                {selector: 'numCitesLabel'}
              ],
              input: [
                {selector: 'numCites'}
              ],
              label: [
                {selector: 'numCitesLabel'}
              ],
              order: [
                {selector: 'numCites'},
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
              input: [
                {selector: 'numPapers'}
              ],
              label: [
                {selector: 'numPapersLabel'}
              ],
              order: [
                {selector: 'numPapers'},
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
              transparency: [
                {selector: 'numPapersTransparency'}
              ],
              strokeTransparency: [
                {selector: 'numPapersTransparency'}
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
            dataVariable: 'numCites',
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
            dataVariable: 'discipline',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'publication',
            dataVariable: 'title',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          transparency: {
            recordSet: 'publication',
            dataVariable: 'id',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'publication',
            dataVariable: 'id',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'publication',
            dataVariable: 'id',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'publication',
            dataVariable: 'id',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
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
          },
          tooltip: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          transparency: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'journal',
            dataVariable: 'name',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
          }
        }
      }, this),
      new DefaultGraphicSymbol({
        id: 'subdisciplinePoints',
        type: 'area',
        recordStream: 'subdisciplines',
        graphicVariables: {
          identifier: {
            recordSet: 'subdiscipline',
            dataVariable: 'id',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          areaSize: {
            recordSet: 'subdiscipline',
            dataVariable: 'numCites',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'subdiscipline',
            dataVariable: 'discipline',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'subdiscipline',
            dataVariable: 'name',
            graphicVariableType: 'text',
            graphicVariableId: 'tooltip'
          },
          transparency: {
            recordSet: 'subdiscipline',
            dataVariable: 'id',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'subdiscipline',
            dataVariable: 'id',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'subdiscipline',
            dataVariable: 'id',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'subdiscipline',
            dataVariable: 'id',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
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
          latitude: {
            recordSet: 'author',
            dataVariable: 'latitude',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude: {
            recordSet: 'author',
            dataVariable: 'longitude',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          x: {
            recordSet: 'author',
            dataVariable: 'x',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          y: {
            recordSet: 'author',
            dataVariable: 'y',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          areaSize: {
            recordSet: 'author',
            dataVariable: 'numCites',
            graphicVariableType: 'areaSize',
            graphicVariableId: 'areaSize'
          },
          color: {
            recordSet: 'author',
            dataVariable: 'firstYear',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'text',
            graphicVariableId: 'text'
          },
          transparency: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'strokeTransparency',
            graphicVariableId: 'fixed'
          },
          strokeWidth: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'fixed'
          },
          strokeColor: {
            recordSet: 'author',
            dataVariable: 'name',
            graphicVariableType: 'strokeColor',
            graphicVariableId: 'fixed'
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
          sourceX: {
            recordSet: 'coAuthorLink',
            dataVariable: 'sourceX',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          sourceY: {
            recordSet: 'coAuthorLink',
            dataVariable: 'sourceY',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          targetX: {
            recordSet: 'coAuthorLink',
            dataVariable: 'targetX',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          targetY: {
            recordSet: 'coAuthorLink',
            dataVariable: 'targetY',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          latitude1: {
            recordSet: 'coAuthorLink',
            dataVariable: 'latitude1',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude1: {
            recordSet: 'coAuthorLink',
            dataVariable: 'longitude1',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          latitude2: {
            recordSet: 'coAuthorLink',
            dataVariable: 'latitude2',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          longitude2: {
            recordSet: 'coAuthorLink',
            dataVariable: 'longitude2',
            graphicVariableType: 'axis',
            graphicVariableId: 'axis'
          },
          strokeWidth: {
            recordSet: 'coAuthorLink',
            dataVariable: 'numPapers',
            graphicVariableType: 'strokeWidth',
            graphicVariableId: 'strokeWidth'
          },
          strokeColor: {
            recordSet: 'coAuthorLink',
            dataVariable: 'firstYear',
            graphicVariableType: 'color',
            graphicVariableId: 'color'
          },
          tooltip: {
            recordSet: 'coAuthorLink',
            dataVariable: 'identifier',
            graphicVariableType: 'identifier',
            graphicVariableId: 'identifier'
          },
          transparency: {
            recordSet: 'coAuthorLink',
            dataVariable: 'identifier',
            graphicVariableType: 'transparency',
            graphicVariableId: 'fixed'
          },
          strokeTransparency: {
            recordSet: 'coAuthorLink',
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
          points: 'publicationPoints'
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
          edges: 'coAuthorLinks',
          nodes: 'authorPoints'
        }
      }, this),
      new SciencemapVisualization({
        id: 'SM01',
        template: 'science-map',
        properties: {},
        graphicSymbols: {
          subdisciplinePoints: 'subdisciplinePoints'
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
      }, this)
    ];
  }
}
