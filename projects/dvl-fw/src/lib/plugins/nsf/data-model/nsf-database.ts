import { parseNSFFile } from './nsf-record';
import { Award } from './nsf-award';
import { extractAwards } from './nsf-extract-awards';

// @dynamic
export class NSFDatabase {
  awards: Award[];

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
