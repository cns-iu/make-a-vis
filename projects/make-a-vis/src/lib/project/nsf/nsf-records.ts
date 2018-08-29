import { parse } from 'papaparse';

export interface NSFRecord {
  title: string;
}

export function parseNSFFile(fileContents: string): NSFRecord[] {
  return parse(fileContents).data;
}
