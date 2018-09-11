
import { DataSource, DataSourceOptions } from '../../shared/data-source';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordStream } from '../../shared/record-stream';
import { DefaultRecordStream } from './default-record-stream';

export class DefaultDataSource<T = any> implements DataSource {
  id: string;
  template: 'default';
  properties: DataSourceOptions;
  recordStreams: RecordStream<T>[];

  constructor(data: {id: string, template?: string, properties: any, recordStreams: any[]}, private project: Project) {
    Object.assign(this, data);
    const rawData = this.project.rawData.find(d => d.id === this.properties.rawData);
    this.recordStreams = data.recordStreams.map((rs) => new DefaultRecordStream({id: rs.id, label: rs.label || rs.id}, rawData));
  }

  toJSON(): any {
    return {
      id: this.id, template: this.template, properties: this.properties,
      recordStreams: this.recordStreams.map(s => s.toJSON())
    };
  }
}

export class DefaultDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'default';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    if (registry.hasObjectFactory('dataSource', data.template)) {
      return await registry.fromJSON<DataSource>('dataSource', data.template, data, context);
    }
    return new DefaultDataSource(data, context);
  }

  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
