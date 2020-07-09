import { DefaultGeocoder, Location } from 'geocoder-ts';

import { Award, AwardStats } from './nsf-award';
import { NSFRecord } from './nsf-record';

export async function extractAwards(records: NSFRecord[]): Promise<Award[]> {
  const awardList: Award[] = [];
  const globalStats = new AwardStats();
  const geocoder = new DefaultGeocoder();

  for (const record of records) {
    const org = record.organization;

    let location: Location;
    if (org.city && org.state) {
      location = await geocoder.getLocation(`${org.city}, ${org.state} ${org.zip5} USA.`);
    } else {
      location = await geocoder.getLocation(org.city);
    }
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
