import { Award } from './nsf-award';
import { Investigator, InvestigatorStats } from './nsf-investigator';

export function extractInvestigators(awards: Award[]): Investigator[] {
  const investigators: any = {}, investigatorList: Investigator[] = [];
  const globalStats = new InvestigatorStats();

  for (const award of awards) {
    award.investigatorNames.forEach((name, index) => {
      let investigator: Investigator = investigators[name];

      // Address also includes name in [brackets]. Strip those out.
      if (!investigator) {
        investigator = investigators[name] = new Investigator({
          name,
          numAwards: 0,
          awardedAmountToDate: 0,
          firstYear: award.startYear || 0,
          lastYear: award.endYear || 0,
          location: award.location,
          globalStats
        });
        investigatorList.push(investigator);
      }

      // If the investigator is the PI, use the organization's location.
      // This is not perfect, but the best we have for determining an Investigator's location.
      if (award.location && index === 0) {
        // Give each investigator a unique location object.
        // Not totally necessary but makes debugging easier.
        investigator.location = Object.assign({}, award.location) as any;
      }

      investigator.awardedAmountToDate += award.awardedAmountToDate;
      investigator.numAwards++;
      if (award.startYear) {
        if (award.startYear < investigator.firstYear) {
          investigator.firstYear = award.startYear;
        }
        if (award.startYear > investigator.lastYear) {
          investigator.lastYear = award.startYear;
        }
      }
      if (award.endYear) {
        if (award.endYear < investigator.firstYear) {
          investigator.firstYear = award.endYear;
        }
        if (award.endYear > investigator.lastYear) {
          investigator.lastYear = award.endYear;
        }
      }
    });
    award.Investigators = award.investigatorNames.map(a => investigators[a]);
  }

  investigatorList.forEach(a => globalStats.count(a));
  return investigatorList;
}
