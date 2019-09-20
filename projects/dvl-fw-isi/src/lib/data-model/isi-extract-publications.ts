import { startCase, toLower, uniq } from 'lodash';

import { Publication, PublicationStats } from './isi-publication';
import { ISIRecord } from './isi-record';

export function extractPublications(publications: ISIRecord[]): Publication[] {
  const publicationList: Publication[] = [];
  const globalStats = new PublicationStats();
  for (const pub of publications) {
    const publication = new Publication({
      id: pub.id,
      title: pub.title,
      issn: pub.issn,
      eissn: pub.eissn,
      journalName: pub.journalName,
      journalFullname: pub.journalFullname,
      authors: uniq((pub.authors || []).map(s => startCase(toLower(s.trim())))),
      authorsFullname: pub.authorsFullname || [],
      authorsAddress: pub.authorsAddress || (pub.authors || []).map(s => ''),
      publicationYear: pub.publicationYear || 0,
      abstract: pub.abstract,
      publicationType: pub.publicationType,
      issue: pub.issue,
      numCites: pub.numCites || 0,
      globalStats
    });
    publicationList.push(publication);
  }
  publicationList.forEach(a => globalStats.count(a));
  return publicationList;
}
