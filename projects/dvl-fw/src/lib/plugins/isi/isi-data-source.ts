// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataSource, DataSourceOptions } from '../../shared/data-source';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordStream } from '../../shared/record-stream';
import { DefaultRecordStream } from '../default/default-record-stream';
import { ISIRecord } from './data-model/isi-record';
import { ISIParsedRawData } from './isi-parsed-raw-data';

export interface ISIDataSourceOptions extends DataSourceOptions {
  parsedData?: string;
  saveParsedData?: boolean;
}

export class ISIDataSource implements DataSource {
  id: string;
  template = 'isi';
  recordStreams: RecordStream<ISIRecord>[];
  properties: ISIDataSourceOptions;

  constructor(data: any, private project: Project) {
    Object.assign(this, data);
    const rawData = this.project.rawData.find(d => d.id === this.properties.rawData);
    let parsedData = this.project.rawData.find(d => d.id === this.properties.parsedData);
    if (!parsedData) {
      parsedData = new ISIParsedRawData(this.properties.parsedData, rawData);
      if (this.properties.saveParsedData) {
        this.project.rawData.push(parsedData);
        parsedData.getData();
      }
    }
    if (!this.properties.saveParsedData) {
      this.project.rawData = this.project.rawData.filter(d => d.id !== this.properties.parsedData);
    }
    this.recordStreams = data.recordStreams.map((rs) => new DefaultRecordStream({id: rs.id, label: rs.label || rs.id}, parsedData));
  }

  toJSON(): any {
    return {
      id: this.id, template: this.template, properties: this.properties,
      recordStreams: this.recordStreams.map(s => s.toJSON())
    };
  }
}

export class ISIDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'isi';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    return new ISIDataSource(data, context);
  }
  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
