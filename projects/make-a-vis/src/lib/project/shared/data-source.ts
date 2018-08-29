import { RecordStream } from './record-stream';

export interface DataSourceOptions {
  dataURL?: string;
  rawData?: string;
}

export interface DataSource {
  id: string;
  template: string;
  properties: DataSourceOptions;
  recordStreams: RecordStream[];

  toJSON(): any;
}
