import { RecordStream } from './record-stream';

export interface DataSource {
  id: string;
  template: string;
  properties: Map<string, any>;
  streams: Map<string, RecordStream<any>>;

  toJSON(): any;
}
