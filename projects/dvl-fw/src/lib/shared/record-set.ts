import { DataVariable } from './data-variable';


export interface RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  dataVariables: DataVariable[];

  toJSON(): any;
}
