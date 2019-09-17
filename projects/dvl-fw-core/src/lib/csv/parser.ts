import { times } from 'lodash';
import { parse as baseParse, ParseConfig, ParseError, ParseMeta as BaseMeta, ParseResult as BaseResult } from 'papaparse';

import { DataType } from '../interfaces';

export { ParseConfig, ParseError };
export interface ParseMeta extends BaseMeta {
  typings: DataType[];
}
export interface ParseResult extends BaseResult {
  meta: ParseMeta;
}

export function parse(input: string, config: ParseConfig): ParseResult {
  // Set dynamicTyping to false when our type parsing is implemented.
  const result = baseParse(input, config) as ParseResult;
  const fields = result.meta.fields;
  if (fields) {
    result.meta.typings = times(fields.length, () => DataType.STRING);
  }

  return result;
}
