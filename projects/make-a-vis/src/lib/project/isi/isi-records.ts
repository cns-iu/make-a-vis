import { RISRecords } from './ris-records';

export interface ISIRecords {
  title: string;
}

export function parseISIFile(fileContents: string): ISIRecords[] {
  return RISRecords(fileContents);
}
