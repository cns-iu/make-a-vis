import {
  areaSizeScaleNormQuantitative, colorScaleNormQuantitative, colorScaleNormQuantitativeStroke, defaultStyles, extractPoint,
  fontSizeScaleNormQuantitative, formatNumber, formatYear, norm0to100, quantitativeTransparency,
} from '@dvl-fw/core';
import { Location } from 'geocoder-ts';
import { access, chain, constant, map, Operand } from '@ngx-dino/core';

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
  position: [number, number];
  globalStats: AuthorStats;
  defaultStyles = defaultStyles;

  constructor(data: any) {
    Object.assign(this, data);
  }

  @Operand(chain(access<number[]>('position'), map(p => p ? p.map(e => parseFloat(e.toFixed(2))) : undefined)))
  positionLabel: [string, string];

  // Positions
  @Operand<number[]>(extractPoint('location.latitude', 'location.longitude'))
  latlng: [number, number];

  @Operand<string>(constant('circle'))
  shape: string;

  // #Papers Encodings
  @Operand<number>(norm0to100('numPapers', 'globalStats.numPapersMax'))
  numPapersNorm: number;
  @Operand<string>(chain(access('numPapers'), formatNumber))
  numPapersLabel: string;
  @Operand<number>(chain(access('numPapersNorm'), areaSizeScaleNormQuantitative))
  numPapersAreaSize: number;
  @Operand<number>(chain(access('numPapersNorm'), fontSizeScaleNormQuantitative))
  numPapersFontSize: number;
  @Operand<string>(chain(access('numPapersNorm'), colorScaleNormQuantitative))
  numPapersColor: string;
  @Operand<string>(chain(access('numPapersNorm'), colorScaleNormQuantitativeStroke))
  numPapersStrokeColor: string;
  @Operand<number>(chain(access<number>('numPapersNorm'), quantitativeTransparency))
  numPapersTransparency: number;

  // #Cites Encodings
  @Operand<number>(norm0to100('numCites', 'globalStats.numCitesMax'))
  numCitesNorm: number;
  @Operand<string>(chain(access('numCites'), formatNumber))
  numCitesLabel: string;
  @Operand<number>(chain(access('numCitesNorm'), areaSizeScaleNormQuantitative))
  numCitesAreaSize: number;
  @Operand<number>(chain(access('numCitesNorm'), fontSizeScaleNormQuantitative))
  numCitesFontSize: number;
  @Operand<string>(chain(access('numCitesNorm'), colorScaleNormQuantitative))
  numCitesColor: string;
  @Operand<string>(chain(access('numCitesNorm'), colorScaleNormQuantitativeStroke))
  numCitesStrokeColor: string;

  @Operand<string>(map(a => a.numCitesNorm > 15 ? a.name : undefined))
  numCitesTopLabel: string;

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
