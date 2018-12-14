// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { CoPiLink, CoPiLinkStats } from './nsf-copi-link';
import { Award } from './nsf-award';
import { sortBy, toLower } from 'lodash';

// Assumes this was run after extractInvestigators
export function extractCoPiLinks(awards: Award[]): CoPiLink[] {
  const coPiLinks: any = {}, coPiLinkList: CoPiLink[] = [];
  const globalStats = new CoPiLinkStats();
  for (const award of awards) {
    const investigators = sortBy(award.Investigators, 'name');
    investigators.forEach((investigator1, index) => {
      for (const investigator2 of investigators.slice(index + 1)) {
        const id = toLower(`${investigator1.name}---${investigator2.name}`);
        let coPiLink: CoPiLink = coPiLinks[id];
        if (!coPiLink) {
          coPiLink = coPiLinks[id] = new CoPiLink({
            investigator1: investigator1.name,
            investigator2: investigator2.name,
            numAwards: 0,
            firstYear: award.startYear || 0,
            lastYear: award.endYear || 0,
            Investigator1: investigator1,
            Investigator2: investigator2,
            globalStats
          });
          coPiLinkList.push(coPiLink);
        }

        coPiLink.numAwards++;
        if (award.startYear) {
          if (award.startYear < coPiLink.firstYear) {
            coPiLink.firstYear = award.startYear;
          }
          if (award.startYear > coPiLink.lastYear) {
            coPiLink.lastYear = award.startYear;
          }
        }
        if (award.endYear) {
          if (award.endYear < coPiLink.firstYear) {
            coPiLink.firstYear = award.endYear;
          }
          if (award.endYear > coPiLink.lastYear) {
            coPiLink.lastYear = award.endYear;
          }
        }
      }
    });
  }
  coPiLinkList.forEach(a => globalStats.count(a));
  return coPiLinkList;
}
