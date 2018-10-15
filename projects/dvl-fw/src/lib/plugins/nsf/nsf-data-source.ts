import { NSFParsedRawData } from './nsf-parsed-raw-data';
import { Project } from './../../shared/project';
import { DataSource, DataSourceOptions } from './../../shared/data-source';
import { RecordStream } from './../../shared/record-stream';
import { NSFRecord } from './data-model/nsf-record';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { DefaultRecordStream } from '../default/default-record-stream';


export interface NSFDataSourceOptions extends DataSourceOptions {
  parsedData?: string;
  saveParsedData?: boolean;
}

export class NSFDataSource implements DataSource {
  id: string;
  template = 'nsf';
  recordStreams: RecordStream<NSFRecord>[];
  properties: NSFDataSourceOptions;

  constructor(data: any, private project: Project) {
    Object.assign(this, data);
    const rawData = this.project.rawData.find(d => d.id === this.properties.rawData);
    let parsedData = this.project.rawData.find(d => d.id === this.properties.parsedData);
    if (!parsedData) {
      parsedData = new NSFParsedRawData(this.properties.parsedData, rawData);
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

export class NSFDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'nsf';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    return new NSFDataSource(data, context);
  }
  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
