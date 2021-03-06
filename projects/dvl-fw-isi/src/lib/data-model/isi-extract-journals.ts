import { issnLookup, journalIdSubdLookup, journalNameLookup } from '@dvl-fw/science-map';

import { Journal, JournalStats } from './isi-journal';
import { Publication } from './isi-publication';

export function scienceLocatePublication(pub: Publication): {journalId: number, subdisciplineId: number} {
  const tries = [
    issnLookup.get(pub.issn),
    issnLookup.get(pub.eissn),
    journalNameLookup.get(pub.journalName),
    journalNameLookup.get(pub.journalFullname)
  ].filter(x => !!x);

  if (tries.length > 0) {
    const journalId = '' + tries[0].id;
    const weights = journalIdSubdLookup.get(journalId);
    const noSubdisciplineId = weights ? -2 : -1;
    const subdisciplineId = weights?.length === 1 ? weights[0].subd_id : noSubdisciplineId;

    return { journalId: parseInt(journalId, 10), subdisciplineId };
  } else {
    return { journalId: undefined, subdisciplineId: -1 };
  }
}

export function extractJournals(publications: Publication[]): Journal[] {
  const journals: any = {}, journalList: Journal[] = [];
  const globalStats = new JournalStats();
  for (const pub of publications.filter(p => p.publicationType === 'J')) {
    let journal: Journal = journals[pub.journalName];
    if (!journal) {
      journal = journals[pub.journalName] = new Journal({
        name: pub.journalName,
        label: pub.journalFullname,
        issn: pub.issn,
        eissn: pub.eissn,
        numPapers: 0,
        numCites: 0,
        firstYear: pub.publicationYear || 0,
        lastYear: pub.publicationYear || 0,
        journalId: undefined,
        subdisciplineId: -1,
        globalStats
      });
      journalList.push(journal);
    }

    journal.numPapers++;
    journal.numCites += pub.numCites || 0;
    if (pub.publicationYear < journal.firstYear) {
      journal.firstYear = pub.publicationYear;
    }
    if (pub.publicationYear > journal.lastYear) {
      journal.lastYear = pub.publicationYear;
    }
    if (!journal.journalId) {
      Object.assign(journal, scienceLocatePublication(pub));
    }

    pub.Journal = journal;
  }
  journalList.forEach(j => globalStats.count(j));
  return journalList;
}
