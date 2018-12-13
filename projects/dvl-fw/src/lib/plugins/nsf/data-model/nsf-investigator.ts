// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { access, chain, constant, Operand } from '@ngx-dino/core';

import {
  areaSizeScaleNormQuantitative, extractPoint, fontSizeScaleNormQuantitative, formatNumber, formatYear,
  greyScaleNormQuantitative, greyScaleNormQuantitativeStroke, norm0to100, quantitativeTransparency
} from '../../../encoding';
import { Location } from '../../../encoding/geocoder';

export class InvestigatorStats {
  numAwardsMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: Investigator) {
    this.numAwardsMax = Math.max(this.numAwardsMax, item.numAwards);
    this.yearMax = Math.max(this.yearMax, item.firstYear, item.lastYear);
    if (item.firstYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.firstYear);
    }
    if (item.lastYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.lastYear);
    }
  }
}

// @dynamic
export class Investigator {
  name: string;
  fullname: string;
  address: string;
  location: Location;

  numAwards: number;
  firstYear: number;
  lastYear: number;
  position: [number, number];
  globalStats: InvestigatorStats;

  constructor(data: any) {
    Object.assign(this, data);
  }

  // Positions
  @Operand<number[]>(extractPoint('location.latitude', 'location.longitude'))
  latlng: [number, number];

  @Operand<string>(constant('circle'))
  shape: string;

  // #Papers Encodings
  @Operand<number>(norm0to100('numAwards', 'globalStats.numAwardsMax'))
  numAwardsNorm: number;
  @Operand<string>(chain(access('numAwards'), formatNumber))
  numAwardsLabel: string;
  @Operand<number>(chain(access('numAwardsNorm'), areaSizeScaleNormQuantitative))
  numAwardsAreaSize: number;
  @Operand<number>(chain(access('numAwardsNorm'), fontSizeScaleNormQuantitative))
  numAwardsFontSize: number;
  @Operand<string>(chain(access('numAwardsNorm'), greyScaleNormQuantitative))
  numAwardsColor: string;
  @Operand<string>(chain(access('numAwardsNorm'), greyScaleNormQuantitativeStroke))
  numAwardsStrokeColor: string;
  @Operand<number>(chain(access<number>('numAwardsNorm'), quantitativeTransparency))
  numAwardsTransparency: number;

  // First Year Encodings
  @Operand<number>(norm0to100('firstYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  firstYearNorm: number;
  @Operand<string>(chain(access('firstYear'), formatYear))
  firstYearLabel: string;
  @Operand<number>(chain(access('firstYearNorm'), areaSizeScaleNormQuantitative))
  firstYearAreaSize: number;
  @Operand<number>(chain(access('firstYearNorm'), fontSizeScaleNormQuantitative))
  firstYearFontSize: number;
  @Operand<string>(chain(access('firstYearNorm'), greyScaleNormQuantitative))
  firstYearColor: string;
  @Operand<string>(chain(access('firstYearNorm'), greyScaleNormQuantitativeStroke))
  firstYearStrokeColor: string;

  // Last Year Encodings
  @Operand<number>(norm0to100('lastYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  lastYearNorm: number;
  @Operand<string>(chain(access('lastYear'), formatYear))
  lastYearLabel: string;
  @Operand<number>(chain(access('lastYearNorm'), areaSizeScaleNormQuantitative))
  lastYearAreaSize: number;
  @Operand<number>(chain(access('lastYearNorm'), fontSizeScaleNormQuantitative))
  lastYearFontSize: number;
  @Operand<string>(chain(access('lastYearNorm'), greyScaleNormQuantitative))
  lastYearColor: string;
  @Operand<string>(chain(access('lastYearNorm'), greyScaleNormQuantitativeStroke))
  lastYearStrokeColor: string;
}
