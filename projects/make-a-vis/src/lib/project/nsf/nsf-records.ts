import { parse } from 'papaparse';

function parseNSFString(fileContents: string): any[] {
  return parse(fileContents).data;
}
