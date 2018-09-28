import { Operand, access, chain, map } from '@ngx-dino/core';
import {
  areaSizeScaleNormQuantitative, fontSizeScaleNormQuantitative, greyScaleNormQuantitative, greyScaleNormQuantitativeStroke,
  norm0to100, formatNumber, formatYear, extractPoint
} from '../../../encoding';
import { Location } from '../../../encoding/geocoder';

export class AuthorStats {
  numPapersMax = 0;
  numCitesMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: Author) {
    this.numPapersMax = Math.max(this.numPapersMax, item.numPapers);
    this.numCitesMax = Math.max(this.numCitesMax, item.numCites);
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
export class Author {
  name: string;
  fullname: string;
  address: string;
  location: Location;

  numPapers: number;
  numCites: number;
  firstYear: number;
  lastYear: number;
  globalStats: AuthorStats;

  constructor(data: any) {
    Object.assign(this, data);
  }

  @Operand<number[]>(extractPoint('location.latitude', 'location.longitude'))
  latlng: [number, number];

  // #Papers Encodings
  @Operand<number>(norm0to100('numPapers', 'globalStats.numPapersMax'))
  numPapersNorm: number;
  @Operand<string>(chain(access('numPapers'), formatNumber))
  numPapersLabel: string;
  @Operand<number>(chain(access('numPapersNorm'), areaSizeScaleNormQuantitative))
  numPapersAreaSize: number;
  @Operand<number>(chain(access('numPapersNorm'), fontSizeScaleNormQuantitative))
  numPapersFontSize: number;
  @Operand<string>(chain(access('numPapersNorm'), greyScaleNormQuantitative))
  numPapersColor: string;
  @Operand<string>(chain(access('numPapersNorm'), greyScaleNormQuantitativeStroke))
  numPapersStrokeColor: string;

  // #Cites Encodings
  @Operand<number>(norm0to100('numCites', 'globalStats.numCitesMax'))
  numCitesNorm: number;
  @Operand<string>(chain(access('numCites'), formatNumber))
  numCitesLabel: string;
  @Operand<number>(chain(access('numCitesNorm'), areaSizeScaleNormQuantitative))
  numCitesAreaSize: number;
  @Operand<number>(chain(access('numCitesNorm'), fontSizeScaleNormQuantitative))
  numCitesFontSize: number;
  @Operand<string>(chain(access('numCitesNorm'), greyScaleNormQuantitative))
  numCitesColor: string;
  @Operand<string>(chain(access('numCitesNorm'), greyScaleNormQuantitativeStroke))
  numCitesStrokeColor: string;

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
