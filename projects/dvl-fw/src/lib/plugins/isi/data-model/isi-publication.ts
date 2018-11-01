// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { access, chain, Operand } from '@ngx-dino/core';

import {
  areaSizeScaleNormQuantitative, fontSizeScaleNormQuantitative, formatNumber, formatYear,
  greyScaleNormQuantitative, greyScaleNormQuantitativeStroke, norm0to100
} from '../../../encoding';
import { Transient } from '../../../shared/transient';
import { Author } from './isi-author';
import { Journal } from './isi-journal';

export class PublicationStats {
  numCitesMax = 0;
  yearMax = 0;
  yearMin = 9999;

  count(publication: Publication) {
    if (publication.numCites) {
      this.numCitesMax = Math.max(this.numCitesMax, publication.numCites);
    }
    if (publication.publicationYear) {
      this.yearMax = Math.max(this.yearMax, publication.publicationYear);
      this.yearMin = Math.min(this.yearMin, publication.publicationYear);
    }
  }
}

// @dynamic
export class Publication {
  id: string;
  title: string;
  issn: string;
  eissn: string;
  journalName: string;
  journalFullname: string;
  authors: string[];
  authorsFullname: string[];
  authorsAddress: string[];
  publicationYear: number;
  abstract: string;
  publicationType: string;
  issue: number;
  numCites: number;
  globalStats: PublicationStats;

  constructor(data: any) {
    Object.assign(this, data);
  }

  @Transient
  Authors: Author[];
  @Transient
  Journal: Journal;

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
  @Operand<number>(norm0to100('publicationYear', 'globalStats.yearMax', 'globalStats.yearMin'))
  publicationYearNorm: number;
  @Operand<string>(chain(access('publicationYear'), formatYear))
  publicationYearLabel: string;
  @Operand<number>(chain(access('publicationYearNorm'), areaSizeScaleNormQuantitative))
  publicationYearAreaSize: number;
  @Operand<number>(chain(access('publicationYearNorm'), fontSizeScaleNormQuantitative))
  publicationYearFontSize: number;
  @Operand<string>(chain(access('publicationYearNorm'), greyScaleNormQuantitative))
  publicationYearColor: string;
  @Operand<string>(chain(access('publicationYearNorm'), greyScaleNormQuantitativeStroke))
  publicationYearStrokeColor: string;
}
