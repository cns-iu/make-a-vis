import { ISIDataSource } from './isi-data-source';
import { DefaultRawData } from './../default/default-raw-data';
import { Project } from '../../shared/project';
import { DefaultProject } from '../default/default-project';
import { ISIParsedRawData } from './isi-parsed-raw-data';


export class ISITemplateProject extends DefaultProject {
  static async create(isiFileContent: string): Promise<Project> {
    const project = new ISITemplateProject(isiFileContent);
    await project.prePopulateData();
    return project;
  }

  constructor(isiFileContent: string) {
    super();
    this.rawData.push(new DefaultRawData({id: 'isiFile', template: 'string', data: isiFileContent}));
    this.rawData.push(new ISIParsedRawData('isiRawData', this.rawData[0]));
    this.dataSources.push(new ISIDataSource({
      id: 'isiDataSource',
      properties: { rawData: 'isiFile', parsedData: 'isiRawData', saveParsedData: true },
      recordStreams: [{id: 'publications'}] // , 'authors', 'coAuthorLinks']
    }, this));
  }

  async prePopulateData() {
    await this.rawData[1].getData();
  }
}

