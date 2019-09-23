import { find, invokeMap, map, pick } from 'lodash';

import { DataSource, DataSourceOptions, Project, RecordStream } from '../../interfaces';
import { DefaultRecordStream, DefaultRecordStreamArg } from '../default';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';
import { ActivityLogRawData } from './log-raw-data';

export interface ActivityLogDataSourceOptions extends DataSourceOptions {
  keepPreviousActivity?: boolean;
  freezeLogs?: boolean;
}

export type ActivityLogDataSourceArg =
  Pick<DataSource, 'id'> &
  Partial<Pick<DataSource, 'template'>> &
  { properties: ActivityLogDataSourceOptions, recordStreams: DefaultRecordStreamArg[] };

export class ActivityLogDataSource implements DataSource {
  id: string;
  template = 'activityLog';
  recordStreams: RecordStream<any>[];
  properties: ActivityLogDataSourceOptions;

  constructor(data: ActivityLogDataSourceArg, project: Project) {
    let rawData = find(project.rawData, ['id', data.properties.rawData]);
    if (!rawData) {
      rawData = new ActivityLogRawData('activityLog', data);
      project.rawData.push(rawData);
    }

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

export class ActivityLogDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'activityLog';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Promise<DataSource> {
    return new ActivityLogDataSource(data, context);
  }

  toJSON(instance: DataSource, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
