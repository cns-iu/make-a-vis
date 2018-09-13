import { ISIRecord, parseISIFile } from './isi-record';
import { extractJournals } from './isi-extract-journals';
import { Journal } from './isi-journal';

// @dynamic
export class ISIDatabase {
  publications: ISIRecord[];
  journals: Journal[];

  static fromISIFile(isiFileContents: string): ISIDatabase {
    const publications = parseISIFile(isiFileContents);
    return {
      journals: extractJournals(publications),
      publications
    };
  }
  static fromJSON(data: any): ISIDatabase {
    return {
      journals: (data.journals || []).map(j => new Journal(j)),
      publications: (data.publications || [])
    };
  }
}
