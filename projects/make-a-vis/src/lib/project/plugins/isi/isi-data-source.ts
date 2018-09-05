import { Project } from './../../shared/project';
import { DataSource, DataSourceOptions } from './../../shared/data-source';
import { RecordStream } from './../../shared/record-stream';
import { ISIRecord } from './isi-records';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { RawData } from '../../shared/raw-data';

export interface ISIDataSourceOptions {
  id: string;
  properties: DataSourceOptions;
  recordStreams: RecordStream<ISIRecord>[];
}
export interface ISITemplateOptions {
  id: string;
  fileContents?: string;
  fileUrl?: string;
}


export class ISIDataSource implements DataSource {
  id: string;
  template: 'isi';
  recordStreams: RecordStream<ISIRecord>[];
  properties: DataSourceOptions;

  constructor(options: ISIDataSourceOptions) {
    Object.assign(this, options);
  }

  toJSON(): any {
    return Object.assign({}, this, { recordStreams: this.recordStreams.map(s => s.id) });
  }
}

export class ISIDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'isi';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    // create deferred record streams... only populate them once its been requested

    return new ISIDataSource({
      id: data.id,
      properties: data.properties,
      recordStreams: data.recordStreams
    });
  }
  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
