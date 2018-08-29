import { DataSource, DataSourceOptions } from './../shared/data-source';
import { RecordStream } from './../shared/record-stream';
import { NSFRecord } from './nsf-records';

export class NSFDataSource implements DataSource {
  template: 'nsf';
  streams: RecordStream<NSFRecord>[];
  properties: Map<string, DataSourceOptions>;

  constructor(public id: string) {

  }

  static fromJSON(data: any): NSFDataSource {
    return null;
  }
  toJSON(): any {
    return null;
  }
}
