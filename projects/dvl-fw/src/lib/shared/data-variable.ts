import { RecordStream } from './record-stream';

export interface DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordStream: RecordStream;
  toJSON(): any;
}
