import { ISIRecord } from './isi-records';

export interface Journal {
  name: string;
  label: string;

  numPapers: number;
  numCites: number;

  firstYear: number;

  issn: string;
  eissn: string;
  journalId: number;
  subdisciplineId: number;
  multidisciplinary: {subd_id: number, weight: number}[];
}

export function extractJournals(publications: ISIRecord[]): Journal[] {

  return [];
}
