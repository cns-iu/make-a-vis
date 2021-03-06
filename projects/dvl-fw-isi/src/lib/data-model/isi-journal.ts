import {
  areaSizeScaleNormQuantitative, colorScaleNormQuantitative, colorScaleNormQuantitativeStroke, defaultStyles,
  fontSizeScaleNormQuantitative, formatNumber, formatYear, norm0to100, quantitativeTransparency, Transient,
} from '@dvl-fw/core';
import { access, chain, Operand } from '@ngx-dino/core';

import { Subdiscipline } from './isi-subdiscipline';

export class JournalStats {
  numPapersMax = 0;
  numCitesMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(item: Journal) {
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
export class Journal {
  // Data Variables
  name: string;
  label: string;
  issn: string;
  eissn: string;
  numPapers: number;
  numCites: number;
  firstYear: number;
  lastYear: number;
  journalId: number;
  subdisciplineId: number;
  globalStats: JournalStats;
  defaultStyles = defaultStyles;

  constructor(data: {
    name: string;
    label: string;
    issn: string;
    eissn: string;
    numPapers: number;
    numCites: number;
    firstYear: number;
    lastYear: number;
    journalId: number;
    subdisciplineId: number;
    globalStats: JournalStats;
  }) {
    Object.assign(this, data);
  }

  @Transient
  Subdiscipline: Subdiscipline;

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
