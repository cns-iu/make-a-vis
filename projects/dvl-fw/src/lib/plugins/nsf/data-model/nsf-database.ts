// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Award } from './nsf-award';
import { Investigator } from './nsf-investigator';
import { CoPiLink } from './nsf-copi-link';
import { extractInvestigators } from './nsf-extract-investigators';
import { extractCoPiLinks } from './nsf-extract-copi-links';
import { layoutCoPiNetwork } from './nsf-layout-copi-network';
import { extractAwards } from './nsf-extract-awards';
import { parseNSFFile } from './nsf-record';

// @dynamic
export class NSFDatabase {
  awards: Award[];
  investigators: Investigator[];
  coPiLinks: CoPiLink[];
  // TODO:
  // organizations: Organization[];

  static fromNSFFile(nsfFileContents: string): NSFDatabase {
    const records = parseNSFFile(nsfFileContents);
    const awards = extractAwards(records);
    const investigators = extractInvestigators(awards);
    const coPiLinks = extractCoPiLinks(awards);
    layoutCoPiNetwork(investigators, coPiLinks);

    return { awards, investigators, coPiLinks };
  }
  static fromJSON(data: any): NSFDatabase {
    return {
      awards: (data.awards || []).map(a => new Award(a)),
      investigators: (data.investigators || []).map(i => new Investigator(i)),
      coPiLinks: (data.coPiLinks || []).map(c => new CoPiLink(c))
    };
  }
}
