import { ISIRecord } from './isi-records';
import { issnLookup, journalNameLookup, journalIdSubdLookup } from '@ngx-dino/science-map';


export interface Journal {
  name: string;
  label: string;
  issn: string;
  eissn: string;

  numPapers: number;
  numCites: number;

  firstYear: number;

  journalId: number;
  subdisciplineId: number;
}

export function scienceLocatePublication(pub: ISIRecord): {journalId: number, subdisciplineId: number} {
  const tries = [
    issnLookup.get(pub.issn),
    issnLookup.get(pub.eissn),
    journalNameLookup.get(pub.journalName),
    journalNameLookup.get(pub.journalFullname)
  ].filter(x => !!x);

  if (tries.length > 0) {
    const journalId = '' + tries[0].id;
    const weights = journalIdSubdLookup.get(journalId);
    const subdisciplineId = !weights ? -1 : weights.length === 1 ? weights[0].subd_id : -2;
    return { journalId: parseInt(journalId, 10), subdisciplineId };
  } else {
    return { journalId: undefined, subdisciplineId: -1 };
  }
}

export function extractJournals(publications: ISIRecord[]): Journal[] {
  const journals: any = {}, journalList: Journal[] = [];
  for (const pub of publications.filter(p => p.publicationType === 'J')) {
    let journal: Journal = journals[pub.journalName];
    if (!journal) {
      journal = journals[pub.journalName] = <Journal>{
        name: pub.journalName,
        label: pub.journalFullname,
        issn: pub.issn,
        eissn: pub.eissn,
        numPapers: 1,
        numCites: pub.numCites,
        firstYear: pub.publicationYear,
        journalId: undefined,
        subdisciplineId: -1
      };
      journalList.push(<Journal>journal);
    } else {
      journal.numPapers++;
      journal.numCites += pub.numCites || 0;
    }

    if (!journal.journalId) {
      Object.assign(journal, scienceLocatePublication(pub));
    }
  }
  return journalList;
}
