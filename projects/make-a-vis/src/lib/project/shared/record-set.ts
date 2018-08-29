import { RecordStream } from './record-stream';
import { DataVariable } from './data-variable';

export class RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  dataVariables: DataVariable[];
}
