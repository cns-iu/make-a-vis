import {
  DataSource, DataSourceOptions, DefaultRecordStream, DefaultRecordStreamArg, ObjectFactory, ObjectFactoryRegistry, Project,
  RecordStream,
} from '@dvl-fw/core';
import { find, invokeMap, map, pick, reject } from 'lodash';

import { NSFRecord } from '../data-model';
import { NSFParsedRawData } from './nsf-parsed-raw-data';
import { Geocoder } from 'geocoder-ts';

export interface NSFDataSourceOptions extends DataSourceOptions {
  parsedData?: string;
  saveParsedData?: boolean;
}

export type NSFDataSourceArg =
  Pick<DataSource, 'id'> &
  Partial<Pick<DataSource, 'template'>> &
  { properties: NSFDataSourceOptions, recordStreams: DefaultRecordStreamArg[] };

export class NSFDataSource implements DataSource {
  id: string;
  template = 'nsf';
  recordStreams: RecordStream<NSFRecord>[];
  properties: NSFDataSourceOptions;

  constructor(data: NSFDataSourceArg, project: Project, private geocoder: Geocoder) {
    Object.assign(this, data);

    const rawData = find(project.rawData, ['id', data.properties.rawData]);
    let parsedData = find(project.rawData, ['id', data.properties.parsedData]);
    if (!parsedData) {
      parsedData = new NSFParsedRawData(this.properties.parsedData, rawData, this.geocoder);
      if (this.properties.saveParsedData) {
        project.rawData.push(parsedData);
        parsedData.getData();
      }
    }

    if (!this.properties.saveParsedData) {
      project.rawData = reject(project.rawData, ['id', data.properties.parsedData]);
    }

    this.recordStreams = map(data.recordStreams, arg => new DefaultRecordStream(arg, parsedData));
  }

  toJSON(): any {
    return Object.assign(pick(this, ['id', 'template', 'properties']), {
      recordStreams: invokeMap(this.recordStreams, 'toJSON')
    });
  }
}

export class NSFDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'nsf';
  type = 'dataSource';

  constructor(private geocoder: Geocoder) { }

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): DataSource {
    return new NSFDataSource(data, context, this.geocoder);
  }

  toJSON(instance: DataSource, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
