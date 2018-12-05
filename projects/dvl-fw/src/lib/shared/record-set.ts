import { DataVariable } from './data-variable';
import { RecordStream } from './record-stream';


export interface RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  parent: RecordSet;
  description: string;
  defaultRecordStream: RecordStream;
  dataVariables: DataVariable[];

  // Function to be run after all RecordSets are added to the project
  resolveParent(recordSets: RecordSet[]);

  toJSON(): any;
}
