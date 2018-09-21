import { DataVariable } from './data-variable';
import { RecordStream } from './record-stream';


export interface RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  defaultRecordStream: RecordStream;
  dataVariables: DataVariable[];

  toJSON(): any;
}
