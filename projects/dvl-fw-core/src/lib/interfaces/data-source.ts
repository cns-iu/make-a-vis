import { RecordStream } from './record-stream';

export interface DataSourceOptions {
  rawData?: string;
}

export interface DataSource {
  id: string;
  template: string;
  properties: DataSourceOptions;
  recordStreams: RecordStream[];

  toJSON(): any;
}
