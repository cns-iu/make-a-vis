import { ScatterplotVisualization } from './../ngx-dino/scatterplot-visualization';
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
      }, this)
    ];
  }

  getRecordSets(): RecordSet[] {
    return [
    ];
  }

  getGraphicVariables(): GraphicVariable[] {
    return DefaultGraphicVariableMapping.fromJSON([
    ], this);
  }

  getGraphicSymbols(): GraphicSymbol[] {
    return [
    ];
  }

  getVisualizations(): Visualization[] {
    return [
    ];
  }
}
