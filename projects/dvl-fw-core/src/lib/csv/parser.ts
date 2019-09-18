import { isBoolean, isInteger, isNumber } from 'lodash';
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
    const types: { [field: string]: DataType } = {};

    if (config.dynamicTyping) {
      // Add better type inferencing later
      result.data.forEach(item => {
        for (const key of fields) {
          const value = item[key];
          if (isInteger(value)) {
            types[key] = DataType.INTEGER;
          } else if (isNumber(value)) {
            types[key] = DataType.NUMBER;
          } else if (isBoolean(value)) {
            types[key] = DataType.STRING;
            item[key] = value ? 'true' : 'false';
          } else if (!types.hasOwnProperty(key)) {
            types[key] = DataType.STRING;
          }
        }
      });
    }

    result.meta.typings = fields.map(f => types[f] || DataType.STRING);
  }

  return result;
}
