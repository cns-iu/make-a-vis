// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { access, chain, constant, Operand } from '@ngx-dino/core';

import {
  areaSizeScaleNormQuantitative, extractPoint, fontSizeScaleNormQuantitative, formatNumber, formatYear,
  colorScaleNormQuantitative, colorScaleNormQuantitativeStroke, norm0to100, quantitativeTransparency,
  defaultStyles
} from '../../../encoding';
import { Location } from '../../../encoding/geocoder';

export class InvestigatorStats {
  awardedAmountMax = 0;
  numAwardsMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: Investigator) {
    this.awardedAmountMax = Math.max(this.awardedAmountMax, item.awardedAmountToDate);
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
  awardedAmountToDate: number;
  firstYear: number;
  lastYear: number;
  position: [number, number];
  globalStats: InvestigatorStats;
  defaultStyles = defaultStyles;

  constructor(data: any) {
    Object.assign(this, data);
  }

  // Positions
  @Operand<number[]>(extractPoint('location.latitude', 'location.longitude'))
  latlng: [number, number];

  @Operand<string>(constant('circle'))
  shape: string;

  // Awarded Amount Encodings
  @Operand<number>(norm0to100('awardedAmountToDate', 'globalStats.awardedAmountMax'))
  awardedAmountNorm: number;
  @Operand<string>(chain(access('awardedAmountToDate'), formatNumber))
  awardedAmountLabel: string;
  @Operand<number>(chain(access('awardedAmountNorm'), areaSizeScaleNormQuantitative))
  awardedAmountAreaSize: number;
  @Operand<number>(chain(access('awardedAmountNorm'), fontSizeScaleNormQuantitative))
  awardedAmountFontSize: number;
  @Operand<string>(chain(access('awardedAmountNorm'), colorScaleNormQuantitative))
  awardedAmountColor: string;
  @Operand<string>(chain(access('awardedAmountNorm'), colorScaleNormQuantitativeStroke))
  awardedAmountStrokeColor: string;
  @Operand<number>(chain(access<number>('awardedAmountNorm'), quantitativeTransparency))
  awardedAmountTransparency: number;

  // #Papers Encodings
  @Operand<number>(norm0to100('numAwards', 'globalStats.numAwardsMax'))
  numAwardsNorm: number;
  @Operand<string>(chain(access('numAwards'), formatNumber))
  numAwardsLabel: string;
  @Operand<number>(chain(access('numAwardsNorm'), areaSizeScaleNormQuantitative))
  numAwardsAreaSize: number;
  @Operand<number>(chain(access('numAwardsNorm'), fontSizeScaleNormQuantitative))
  numAwardsFontSize: number;
  @Operand<string>(chain(access('numAwardsNorm'), colorScaleNormQuantitative))
  numAwardsColor: string;
  @Operand<string>(chain(access('numAwardsNorm'), colorScaleNormQuantitativeStroke))
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
  @Operand<string>(chain(access('firstYearNorm'), colorScaleNormQuantitative))
  firstYearColor: string;
  @Operand<string>(chain(access('firstYearNorm'), colorScaleNormQuantitativeStroke))
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
  @Operand<string>(chain(access('lastYearNorm'), colorScaleNormQuantitative))
  lastYearColor: string;
  @Operand<string>(chain(access('lastYearNorm'), colorScaleNormQuantitativeStroke))
  lastYearStrokeColor: string;
}
