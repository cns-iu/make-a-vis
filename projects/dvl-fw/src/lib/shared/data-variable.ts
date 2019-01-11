import { RecordSet } from './record-set';

export interface DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordSet: RecordSet;
  toJSON(): any;
}
