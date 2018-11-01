// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataSource, DataSourceOptions } from './../../shared/data-source';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from './../../shared/project';
import { RecordStream } from './../../shared/record-stream';
import { DefaultRecordStream } from '../default/default-record-stream';
import { ActivityLogRawData } from './log-raw-data';


export interface ActivityLogDataSourceOptions extends DataSourceOptions {
  keepPreviousActivity?: boolean;
  freezeLogs?: boolean;
}

export class ActivityLogDataSource implements DataSource {
  id: string;
  template = 'activityLog';
  recordStreams: RecordStream<any>[];
  properties: ActivityLogDataSourceOptions;

  constructor(data: any, private project: Project) {
    Object.assign(this, data);
    let rawData = this.project.rawData.find(d => d.id === this.properties.rawData);
    if (!rawData) {
      rawData = new ActivityLogRawData('activityLog', data);
      this.project.rawData.push(rawData);
    }
    this.recordStreams = data.recordStreams.map((rs) => new DefaultRecordStream({id: rs.id, label: rs.label || rs.id}, rawData));
  }

  toJSON(): any {
    return {
      id: this.id, template: this.template, properties: this.properties,
      recordStreams: this.recordStreams.map(s => s.toJSON())
    };
  }
}

export class ActivityLogDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'activityLog';
  type = 'dataSource';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<DataSource> {
    return new ActivityLogDataSource(data, context);
  }
  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
