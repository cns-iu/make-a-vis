import { Operator, access, chain, combine, map } from '@ngx-dino/core';

import { SizeScale } from './size-scale';
import { ColorScale } from './color-scale';

export function norm0to100(field: string, maxField: string, minField?: string): Operator<any, number> {
  if (!minField) {
    return chain(
      combine([access(field, 0), access(maxField, 1)]),
      map(([val, maxVal]) => val / maxVal * 100)
    );
  } else {
    return chain(
      combine([access(field, 0), access(maxField, 1), access(minField, 0)]),
      map(([val, maxVal, minVal]) => (val - minVal) / (maxVal - minVal) * 100)
    );
  }
}

export const formatNumber = map<number, string>(x => x.toLocaleString());
export const formatYear = map<number, string>(x => '' + x);

export const greyScale = new ColorScale('#bdbdbd', '#000000', '#ffffff', -51);
export const greyScaleNormQuantitative = greyScale.quantitative([0, 100]);
export const greyScaleNormQuantitativeStroke = greyScale.quantitativeStrokeColor([0, 100]);

export const areaSizeRange = [100, 500];
export const areaSizeScale = new SizeScale(areaSizeRange[0], areaSizeRange[1], 5, 'linear'); // TBD TODO
export const areaSizeScaleNormQuantitative = areaSizeScale.quantitative([0, 100]);

export const fontSizeRange = [6, 20];
export const fontSizeScale = new SizeScale(fontSizeRange[0], fontSizeRange[1], 5, 'linear'); // TBD TODO
export const fontSizeScaleNormQuantitative = fontSizeScale.quantitative([0, 100]);