import {
  parse as papaparse,
  ParseConfig,
  ParseError,
  ParseMeta as PapaParseMeta,
  ParseResult as PapaParseResult,
} from 'papaparse';
import { times } from 'lodash';

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
    result.meta.typings = times(fields.length, () => DataType.STRING);
  }

  return result;
}
