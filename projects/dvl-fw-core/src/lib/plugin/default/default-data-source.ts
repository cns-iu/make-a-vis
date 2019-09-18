import { find, invokeMap, map, pick } from 'lodash';

import { DataSource, DataSourceOptions, Project, RecordStream } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';
import { DefaultRecordStream, DefaultRecordStreamArg } from './default-record-stream';

export type DefaultDataSourceArg =
  Pick<DataSource, 'id' | 'properties'> &
  Partial<Pick<DataSource, 'template'>> &
  { recordStreams: DefaultRecordStreamArg[] };

export class DefaultDataSource<T = any> implements DataSource {
  id: string;
  template = 'default';
  properties: DataSourceOptions;
  recordStreams: RecordStream<T>[];

  constructor(data: DefaultDataSourceArg, project: Project) {
    const rawData = find(project.rawData, ['id', this.properties.rawData]);
    Object.assign(this, data, {
      recordStreams: map(data.recordStreams, arg => new DefaultRecordStream(arg, rawData))
    });
  }

  toJSON(): any {
    return Object.assign(pick(this, ['id', 'template', 'properties']), {
      recordStreams: invokeMap(this.recordStreams, 'toJSON')
    });
  }
}

export class DefaultDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'default';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    if (data.template !== this.id && registry.hasObjectFactory('dataSource', data.template)) {
      return await registry.fromJSON<DataSource>('dataSource', data.template, data, context);
    }
    return new DefaultDataSource(data, context);
  }

  toJSON(instance: DataSource, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
