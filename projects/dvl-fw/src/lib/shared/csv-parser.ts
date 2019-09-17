import { isBoolean, isInteger, isNumber } from 'lodash';
import { parse as papaparse, ParseConfig, ParseError, ParseMeta as PapaParseMeta, ParseResult as PapaParseResult } from 'papaparse';

import { DataType } from './data-variable';


export { ParseConfig, ParseError };
export interface ParseMeta extends PapaParseMeta {
  typings: DataType[];
}
export interface ParseResult extends PapaParseResult {
  meta: ParseMeta;
}

export function parse(input: string, config: ParseConfig): ParseResult {
  // Set dynamicTyping to false when our type parsing is implemented.
  const result = papaparse(input, config) as ParseResult;
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
