// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { access, chain, map, lookup, Operand } from '@ngx-dino/core';
import {
  areaSizeScaleNormQuantitative, extractPoint, formatNumber, formatYear, fontSizeScaleNormQuantitative,
  colorScaleNormQuantitative, colorScaleNormQuantitativeStroke, norm0to100, quantitativeTransparency,
  defaultStyles
} from '../../../encoding';
import { Location } from '../../../encoding/geocoder';
import { Transient } from '../../../shared/transient';

import { Investigator } from './nsf-investigator';


const awardInstrumentColorLookup = lookup({
  'Standard Grant': '#a6cee3', //
  'Gaa': '#1f78b4',
  'Continuing Grant': '#b2df8a', //
  'Cooperative Agreement': '#33a02c',
  'Interagency Agreement': '#fb9a99', //
  'Contract': '#e31a1c',
  'Fixed Price Award': '#fdbf6f',
  'Fellowship': '#ff7f00', //
  'Boa/task Order': '#cab2d6',
  'Contract Interagency Agreement': '#6a3d9a'
}, '#ffff99');

export class AwardStats {
  awardedAmountMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: Award) {
    this.awardedAmountMax = Math.max(this.awardedAmountMax, item.awardedAmountToDate, item.arraAmount);
    this.yearMax = Math.max(this.yearMax, item.startYear, item.endYear, item.lastAmendmentYear);
    if (item.startYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.startYear);
    }
    if (item.endYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.endYear);
    }
    if (item.lastAmendmentYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.lastAmendmentYear);
    }
  }
}

// @dynamic
export class Award {
  id: string;
  title: string;

  piName: string;
  piEmailAddress: string;
  coPiNames: string[];

  organization: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    zip5: string;
    phone: string;
  };

  location: Location;

  startDate: Date;
  endDate: Date;
  lastAmendmentDate: Date;
  startYear: number;
  endYear: number;
  lastAmendmentYear: number;

  awardInstrument: string;
  awardedAmountToDate: number;
  arraAmount: number;

  nsfOrganization: string;
  nsfPrograms: string[];
  nsfProgramManager: string;
  nsfDirectorate: string;
  programElementCodes: string[];
  programReferenceCodes: string[];

  abstract: string;

  globalStats: AwardStats;
  defaultStyles = defaultStyles;

  constructor(data: any) {
    Object.assign(this, data);
  }

  @Transient
  Investigators: Investigator[];

  @Operand<string[]>(map(s => [s.piName].concat(s.coPiNames)))
  investigatorNames: string[];

  @Operand<string>(chain(access('awardInstrument'), awardInstrumentColorLookup))
  awardInstrumentColor: string;

  @Operand<number[]>(extractPoint('location.latitude', 'location.longitude'))
  latlng: [number, number];

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

  // Start Year Encodings
  @Operand<number>(norm0to100('startYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  startYearNorm: number;
  @Operand<string>(chain(access('startYear'), formatYear))
  startYearLabel: string;
  @Operand<number>(chain(access('startYearNorm'), areaSizeScaleNormQuantitative))
  startYearAreaSize: number;
  @Operand<number>(chain(access('startYearNorm'), fontSizeScaleNormQuantitative))
  startYearFontSize: number;
  @Operand<string>(chain(access('startYearNorm'), colorScaleNormQuantitative))
  startYearColor: string;
  @Operand<string>(chain(access('startYearNorm'), colorScaleNormQuantitativeStroke))
  startYearStrokeColor: string;

  // End Year Encodings
  @Operand<number>(norm0to100('endYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  endYearNorm: number;
  @Operand<string>(chain(access('endYear'), formatYear))
  endYearLabel: string;
  @Operand<number>(chain(access('endYearNorm'), areaSizeScaleNormQuantitative))
  endYearAreaSize: number;
  @Operand<number>(chain(access('endYearNorm'), fontSizeScaleNormQuantitative))
  endYearFontSize: number;
  @Operand<string>(chain(access('endYearNorm'), colorScaleNormQuantitative))
  endYearColor: string;
  @Operand<string>(chain(access('endYearNorm'), colorScaleNormQuantitativeStroke))
  endYearStrokeColor: string;

  // Last Amendment Year Encodings
  @Operand<number>(norm0to100('lastAmendmentYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  lastAmendmentYearNorm: number;
  @Operand<string>(chain(access('lastAmendmentYear'), formatYear))
  lastAmendmentYearLabel: string;
  @Operand<number>(chain(access('lastAmendmentYearNorm'), areaSizeScaleNormQuantitative))
  lastAmendmentYearAreaSize: number;
  @Operand<number>(chain(access('lastAmendmentYearNorm'), fontSizeScaleNormQuantitative))
  lastAmendmentYearFontSize: number;
  @Operand<string>(chain(access('lastAmendmentYearNorm'), colorScaleNormQuantitative))
  lastAmendmentYearColor: string;
  @Operand<string>(chain(access('lastAmendmentYearNorm'), colorScaleNormQuantitativeStroke))
  lastAmendmentYearStrokeColor: string;
}
