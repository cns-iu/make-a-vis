import { DataSource, DataSourceOptions } from './../shared/data-source';
import { RecordStream } from './../shared/record-stream';
import { ISIRecord } from './isi-records';


export class ISIDataSource implements DataSource {
  template: 'isi';
  streams: RecordStream<ISIRecord>[];
  properties: Map<string, DataSourceOptions>;

  constructor(public id: string) {

  }

  static fromJSON(data: any): ISIDataSource {
    return null;
  }
  toJSON(): any {
    return null;
  }
}

