import { RISRecords } from './ris-records';

export interface ISIRecord {
  title: string;
}

export function parseISIFile(fileContents: string): ISIRecord[] {
  return RISRecords(fileContents);
}
