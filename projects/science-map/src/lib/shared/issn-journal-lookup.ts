import { chain, lookup, map, Operator } from '@ngx-dino/core';

import issnToJournIdLookup from '../data/issnToJournIdLookup.json';
import { normalizeIssn } from './normalize-issn';

export const issnRawLookup: Operator<string, any> = lookup<string, any>(<any>issnToJournIdLookup);
export const issnLookup: Operator<string, any> = chain(map(normalizeIssn), issnRawLookup);
