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

export function extractPoint<T>(...fields: string[]): Operator<any, T[]> {
  return chain(
    combine<string, T[]>(fields.map(f => access(f, undefined))),
    // If any data wasn't mapped, return undefined
    map<T[], T[]>(data => data.some(d => d === undefined) ? undefined : data)
  );
}

export const formatNumber = map<number, string>(x => x.toLocaleString());
export const formatYear = map<number, string>(x => '' + x);

// Material colors: Teal 800 (dark) to Teal 50 (light)
export const colorScale = new ColorScale('#00695c', '#e0f2f1', '#ffffff', -51);
export const colorScaleNormQuantitative = colorScale.quantitative([0, 100]);
export const colorScaleNormQuantitativeStroke = colorScale.quantitativeStrokeColor([0, 100]);
// Same color scale, but reversed Light to Dark
export const colorScaleReversedNormQuantitative = colorScale.quantitative([100, 0]);
export const colorScaleReversedNormQuantitativeStroke = colorScale.quantitativeStrokeColor([100, 0]);

export const greyScale = new ColorScale('#bdbdbd', '#000000', '#ffffff', -51);
export const greyScaleNormQuantitative = greyScale.quantitative([0, 100]);
export const greyScaleNormQuantitativeStroke = greyScale.quantitativeStrokeColor([0, 100]);

export const areaSizeRange = [28, 750];
export const areaSizeScale = new SizeScale(areaSizeRange[0], areaSizeRange[1], 5, 'linear'); // TBD TODO
export const areaSizeScaleNormQuantitative = areaSizeScale.quantitative([0, 100]);

export const fontSizeRange = [6, 20];
export const fontSizeScale = new SizeScale(fontSizeRange[0], fontSizeRange[1], 5, 'linear'); // TBD TODO
export const fontSizeScaleNormQuantitative = fontSizeScale.quantitative([0, 100]);

export const strokeWidthRange = [0.5, 8];
export const strokeWidthScale = new SizeScale(strokeWidthRange[0], strokeWidthRange[1], 5, 'linear'); // TBD TODO
export const strokeWidthScaleNormQuantitative = strokeWidthScale.quantitative([0, 100]);

export const quantitativeTransparency = map<number, number>(n => ((100 - n) / 100) * 0.49);

export const defaultStyles = {
  transparency: 0.25,
  strokeTransparency: 0.0,
  strokeWidth: 0.5,
  strokeColor: '#000007',
  labelPosition: 'left',
  labelPositionCenter: 'center'
};
