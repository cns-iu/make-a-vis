import { RecordStream } from './record-stream';
import { DataVariable } from './data-variable';

export class RecordSet<T> {
  id: string;
  label: string;
  labelPlural: string;
  recordStream: RecordStream<T>;

  dataVariables: Map<string, DataVariable>;
}
