import { NSFRecord } from './nsf-record';
import { Award, AwardStats } from './nsf-award';
import { Geocoder } from '../../../encoding/geocoder';

export function extractAwards(records: NSFRecord[]): Award[] {
  const awardList: Award[] = [];
  const globalStats = new AwardStats();
  const geocoder = new Geocoder();

  for (const record of records) {
    const org = record.organization;
    const location = geocoder.getUSLocation(`${org.city}, ${org.state} ${org.zip5} USA.`);
    const award = new Award(Object.assign({}, record, {location, globalStats}));
    awardList.push(award);

    if (award.location) {
      // Give each award a unique location object.
      // Not totally necessary but makes debugging easier.
      award.location = Object.assign({}, award.location);
    }
  }
  awardList.forEach(a => globalStats.count(a));
  return awardList;
}
