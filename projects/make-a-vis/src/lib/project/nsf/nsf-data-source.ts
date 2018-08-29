import { DataSource, DataSourceOptions } from './../shared/data-source';
import { RecordStream } from './../shared/record-stream';

export class NSFDataSource implements DataSource {
  template: 'nsf';
  streams: Map<string, RecordStream<any>>;
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
