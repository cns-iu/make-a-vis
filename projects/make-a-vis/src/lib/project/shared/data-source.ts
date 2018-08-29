import { RecordStream } from './record-stream';

export interface DataSourceOptions {
  dataURL?: string;
  rawData?: string;
}

export interface DataSource<T = any> {
  id: string;
  template: string;
  properties: Map<string, DataSourceOptions>;
  streams: Map<string, RecordStream<T>>;

  toJSON(): any;
}
