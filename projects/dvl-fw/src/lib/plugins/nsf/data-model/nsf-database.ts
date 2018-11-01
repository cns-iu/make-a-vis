// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Award } from './nsf-award';
import { extractAwards } from './nsf-extract-awards';
import { parseNSFFile } from './nsf-record';

// @dynamic
export class NSFDatabase {
  awards: Award[];
  // TODO:
  // organizations: Organization[];
  // investigators: Investigator[];
  // coInvestigatorLinks: CoInvestigatorLink[];

  static fromNSFFile(nsfFileContents: string): NSFDatabase {
    const records = parseNSFFile(nsfFileContents);
    const awards = extractAwards(records);

    return { awards };
  }
  static fromJSON(data: any): NSFDatabase {
    return {
      awards: (data.awards || []).map(a => new Award(a))
    };
  }
}
