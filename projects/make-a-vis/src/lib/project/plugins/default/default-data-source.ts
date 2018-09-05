import { access, RawChangeSet } from '@ngx-dino/core';
import { Observable, defer } from 'rxjs';
import { map } from 'rxjs/operators';

import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { RawData } from '../../shared/raw-data';
import { DataSource, DataSourceOptions } from './../../shared/data-source';
import { Project } from './../../shared/project';
import { RecordStream } from './../../shared/record-stream';


export class DefaultRecordStream<T = any> implements RecordStream<T> {

  constructor(public id: string, public label: string, private dataSource) {}

  asObservable(): Observable<RawChangeSet<T>> {
    return defer<T[]>(this.getData.bind(this)).pipe(map(RawChangeSet.fromArray));
  }
  async getData(): Promise<T[]> {
    const data = await this.dataSource.getRawData().getData();
    return access<T[]>(this.id, []).get(data);
  }
  toJSON(): any {
    return { id: this.id, label: this.label || undefined };
  }
}

export class DefaultDataSource<T = any> implements DataSource {
  template: 'default';
  recordStreams: RecordStream<T>[];

  constructor(public id, recordStreams: any[], public properties: DataSourceOptions, private project: Project) {
    this.recordStreams = recordStreams.map((rs) => new DefaultRecordStream(rs.id, rs.label || rs.id, this));
  }

  getRawData(): RawData {
    return this.project.rawData.find(d => d.id === this.properties.rawData);
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
    // create deferred record streams... only populate them once its been requested
    if (registry.hasObjectFactory('dataSource', data.template)) {
      return await registry.fromJSON<DataSource>('dataSource', data.template, data, context);
    }
    return new DefaultDataSource(data.id, data.recordStreams, data.properties, context);
  }

  toJSON(instance: DataSource, context: Project, registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
