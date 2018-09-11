import { parseRISRecords, TagMapping } from './ris-reader';

export interface ISIRecord {
  id: string;
  title: string;
  issn: string;
  eissn: string;
  journalName: string;
  journalFullname: string;
  authors: string[];
  authorsFullname: string[];
  publicationYear: number;
  abstract: string;
  publicationType: string;
  issue: number;
  numCites: number;
}

export const ISI_TAGS: TagMapping = {
  'FN': { ignored: true },
  'VR': { ignored: true },
  'ER': { endrecord: true },
  'default': { ignored: true },

  'UT': { string: true, separator: ' ', remap: 'id'},
  'TI': { string: true, separator: ' ', remap: 'title' },
  'SN': { string: true, separator: ' ', remap: 'issn' },
  'EI': { string: true, separator: ' ', remap: 'eissn' },
  'J9': { string: true, separator: ' ', remap: 'journalName' },
  'JI': { string: true, separator: ' ', remap: 'journalFullname' },
  'AU': { list: true, remap: 'authors' },
  'AF': { list: true, remap: 'authorsFullname' },
  'PY': { number: true, remap: 'publicationYear' },

  'AB': { string: true, separator: ' ', remap: 'abstract' },
  'PT': { string: true, separator: ' ', remap: 'publicationType' },
  'IS': { number: true, remap: 'issue' },

  'TC': { number: true, remap: 'numCites' }
};

export function parseISIFile(fileContents: string): ISIRecord[] {
  return parseRISRecords(fileContents, ISI_TAGS);
}
