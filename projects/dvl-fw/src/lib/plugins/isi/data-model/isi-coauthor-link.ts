import { Operand, chain, access } from '@ngx-dino/core';
import {
  areaSizeScaleNormQuantitative, fontSizeScaleNormQuantitative, greyScaleNormQuantitative, greyScaleNormQuantitativeStroke,
  norm0to100, formatNumber, formatYear
} from '../../../encoding';

export class CoAuthorLinkStats {
  numPapersMax = 0;
  numCitesMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(coAuthorLink: CoAuthorLink) {
    this.numPapersMax = Math.max(this.numPapersMax, coAuthorLink.numPapers);
    this.numCitesMax = Math.max(this.numCitesMax, coAuthorLink.numCites);
    this.yearMax = Math.max(this.yearMax, coAuthorLink.firstYear, coAuthorLink.lastYear);
    this.yearMin = Math.min(this.yearMin, coAuthorLink.firstYear, coAuthorLink.lastYear);
  }
}

// @dynamic
export class CoAuthorLink {
  author1: string;
  author2: string;
  numPapers: number;
  numCites: number;
  firstYear: number;
  lastYear: number;
  globalStats: CoAuthorLinkStats;

  constructor(data: any) {
    Object.assign(this, data);
  }

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
