// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { access, chain, combine, map, Operand } from '@ngx-dino/core';

import {
  areaSizeScaleNormQuantitative, fontSizeScaleNormQuantitative, strokeWidthScaleNormQuantitative,
  colorScaleNormQuantitative, colorScaleNormQuantitativeStroke,
  norm0to100, formatNumber, formatYear, quantitativeTransparency,
  defaultStyles
} from '../../../encoding';
import { Transient } from '../../../shared/transient';

import { Investigator } from './nsf-investigator';

export class CoPiLinkStats {
  numAwardsMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: CoPiLink) {
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
export class CoPiLink {
  investigator1: string;
  investigator2: string;
  numAwards: number;
  firstYear: number;
  lastYear: number;
  globalStats: CoPiLinkStats;
  defaultStyles = defaultStyles;

  constructor(data: any) {
    Object.assign(this, data);
  }

  @Transient
  Investigator1: Investigator;
  @Transient
  Investigator2: Investigator;

  @Operand<string>(chain(combine([access('investigator1'), access('investigator2')]), map(([a1, a2]) => a1 + a2)))
  identifier: string;

  // Positions
  @Operand<[number, number]>(access('Investigator1.position'))
  source: [number, number];
  @Operand<[number, number]>(access('Investigator2.position'))
  target: [number, number];

  // #Papers Encodings
  @Operand<number>(norm0to100('numAwards', 'globalStats.numAwardsMax'))
  numAwardsNorm: number;
  @Operand<string>(chain(access('numAwards'), formatNumber))
  numAwardsLabel: string;
  @Operand<number>(chain(access('numAwardsNorm'), areaSizeScaleNormQuantitative))
  numAwardsAreaSize: number;
  @Operand<number>(chain(access('numAwardsNorm'), strokeWidthScaleNormQuantitative))
  numAwardsStrokeWidth: number;
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
  @Operand<number>(chain(access('firstYearNorm'), strokeWidthScaleNormQuantitative))
  firstYearStrokeWidth: number;
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
  @Operand<number>(chain(access('lastYearNorm'), strokeWidthScaleNormQuantitative))
  lastYearStrokeWidth: number;
  @Operand<number>(chain(access('lastYearNorm'), fontSizeScaleNormQuantitative))
  lastYearFontSize: number;
  @Operand<string>(chain(access('lastYearNorm'), colorScaleNormQuantitative))
  lastYearColor: string;
  @Operand<string>(chain(access('lastYearNorm'), colorScaleNormQuantitativeStroke))
  lastYearStrokeColor: string;
}
