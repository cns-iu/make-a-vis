import {
  DataSource, DataSourceOptions, DefaultRecordStream, DefaultRecordStreamArg, ObjectFactory, ObjectFactoryRegistry, Project,
  RecordStream,
} from '@dvl-fw/core';
import { find, invokeMap, map, pick, reject } from 'lodash';

import { ISIRecord } from '../data-model';
import { ISIParsedRawData } from './isi-parsed-raw-data';
import { Geocoder, DefaultGeocoder } from 'geocoder-ts';

export interface ISIDataSourceOptions extends DataSourceOptions {
  parsedData?: string;
  saveParsedData?: boolean;
}

export type ISIDataSourceArg =
  Pick<DataSource, 'id'> &
  Partial<Pick<DataSource, 'template'>> &
  { properties: ISIDataSourceOptions, recordStreams: DefaultRecordStreamArg[] };

export class ISIDataSource implements DataSource {
  id: string;
  template = 'isi';
  recordStreams: RecordStream<ISIRecord>[];
  properties: ISIDataSourceOptions;

  constructor(data: ISIDataSourceArg, project: Project, private geocoder: Geocoder = new DefaultGeocoder()) {
    Object.assign(this, data);

    const rawData = find(project.rawData, ['id', data.properties.rawData]);
    let parsedData = find(project.rawData, ['id', data.properties.parsedData]);
    if (!parsedData) {
      parsedData = new ISIParsedRawData(this.properties.parsedData, rawData, null, this.geocoder);
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

export class ISIDataSourceFactory implements ObjectFactory<DataSource, Project> {
  id = 'isi';
  type = 'dataSource';

  constructor(private geocoder: Geocoder = new DefaultGeocoder()) { }

  async fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Promise<DataSource> {
    return new ISIDataSource(data, context, this.geocoder);
  }

  toJSON(instance: DataSource, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
