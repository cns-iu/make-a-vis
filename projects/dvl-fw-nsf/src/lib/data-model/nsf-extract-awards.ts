import { DefaultGeocoder } from 'geocoder-ts';

import { Award, AwardStats } from './nsf-award';
import { NSFRecord } from './nsf-record';

export function extractAwards(records: NSFRecord[]): Award[] {
  const awardList: Award[] = [];
  const globalStats = new AwardStats();
  const geocoder = new DefaultGeocoder();

  records.forEach(async record => {
    const org = record.organization;
    const location = await geocoder.getLocation(`${org.city}, ${org.state} ${org.zip5} USA.`);
    const award = new Award(Object.assign({}, record, {location, globalStats}));
    awardList.push(award);

    if (award.location) {
      // Give each award a unique location object.
      // Not totally necessary but makes debugging easier.
      award.location = Object.assign({}, award.location);
    }
  });

  awardList.forEach(a => globalStats.count(a));
  return awardList;
}
