import { ISIRecord, parseISIFile } from './isi-records';
import { Journal, extractJournals } from './isi-journals';


export interface ISIDatabase {
  publications: ISIRecord[];
  journals: Journal[];
}

export function createISIDatabase(isiFileContents: string): ISIDatabase {
  const publications = parseISIFile(isiFileContents);
  return {
    publications,
    journals: extractJournals(publications)
  };
}
