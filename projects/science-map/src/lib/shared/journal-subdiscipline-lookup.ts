import { lookup, Operator } from '@ngx-dino/core';

import journIdToSubdLookup from '../data/journIdToSubdLookup.json';

export const journalIdSubdLookup: Operator<string, any> = lookup(journIdToSubdLookup);
