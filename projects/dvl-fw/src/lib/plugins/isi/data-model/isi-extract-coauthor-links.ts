import { ISIRecord } from './isi-record';
import { CoAuthorLink, CoAuthorLinkStats } from './isi-coauthor-link';

export function extractCoAuthorLinks(publications: ISIRecord[]): CoAuthorLink[] {
  const coAuthorLinks: any = {}, coAuthorLinkList: CoAuthorLink[] = [];
  const globalStats = new CoAuthorLinkStats();
  for (const pub of publications) {
    const authors = pub.authors.concat();
    authors.sort();
    authors.forEach((author1, index) => {
      for (const author2 of authors.slice(index + 1)) {
        const id = `${author1}<->${author2}`;
        let coAuthorLink: CoAuthorLink = coAuthorLinks[id];
        if (!coAuthorLink) {
          coAuthorLink = coAuthorLinks[id] = new CoAuthorLink({
            author1,
            author2,
            numPapers: 0,
            numCites: 0,
            firstYear: pub.publicationYear,
            lastYear: pub.publicationYear,
            globalStats
          });
          coAuthorLinkList.push(coAuthorLink);
        }

        coAuthorLink.numPapers++;
        coAuthorLink.numCites += pub.numCites || 0;
        if (pub.publicationYear < coAuthorLink.firstYear) {
          coAuthorLink.firstYear = pub.publicationYear;
        }
        if (pub.publicationYear > coAuthorLink.lastYear) {
          coAuthorLink.lastYear = pub.publicationYear;
        }
      }
    });
  }
  coAuthorLinkList.forEach(a => globalStats.count(a));
  return coAuthorLinkList;
}
