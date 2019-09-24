import { Award } from './nsf-award';
import { CoPiLink } from './nsf-copi-link';
import { extractAwards } from './nsf-extract-awards';
import { extractCoPiLinks } from './nsf-extract-copi-links';
import { extractInvestigators } from './nsf-extract-investigators';
import { Investigator } from './nsf-investigator';
import { layoutCoPiNetwork } from './nsf-layout-copi-network';
import { parseNSFFile } from './nsf-record';

// @dynamic
export class NSFDatabase {
  awards: Award[];
  investigators: Investigator[];
  coPiLinks: CoPiLink[];
  // TODO:
  // organizations: Organization[];

  constructor(data: { awards: Award[], investigators: Investigator[], coPiLinks: CoPiLink[] }, reconstitute?: boolean) {
    Object.assign(this, data);
    if (reconstitute) {
      this.reconstitute();
    }
  }

  static fromNSFFile(nsfFileContents: string): NSFDatabase {
    const records = parseNSFFile(nsfFileContents);
    const awards = extractAwards(records);
    const investigators = extractInvestigators(awards);
    const coPiLinks = extractCoPiLinks(awards);
    layoutCoPiNetwork(investigators, coPiLinks);

    return new NSFDatabase({ awards, investigators, coPiLinks });
  }

  static fromJSON(data: any): NSFDatabase {
    return new NSFDatabase({
      awards: (data.awards || []).map(a => new Award(a)),
      investigators: (data.investigators || []).map(i => new Investigator(i)),
      coPiLinks: (data.coPiLinks || []).map(c => new CoPiLink(c))
    }, true);
  }

  private reconstitute() {
    const investigators = this.investigators.reduce((acc, val) => (acc[val.name] = val, acc), {});

    this.awards.forEach(a => a.Investigators = a.investigatorNames.map(i => investigators[i]));
    this.coPiLinks.forEach(co => {
      co.Investigator1 = investigators[co.investigator1];
      co.Investigator2 = investigators[co.investigator2];
    });
  }
}
