import { NSFRecord } from './nsf-record';
import { Award, AwardStats } from './nsf-award';

export function extractAwards(records: NSFRecord[]): Award[] {
  const awardList: Award[] = [];
  const globalStats = new AwardStats();
  for (const record of records) {
    const award = new Award(Object.assign({}, record, {globalStats}));
    awardList.push(award);
  }
  awardList.forEach(a => globalStats.count(a));
  return awardList;
}
