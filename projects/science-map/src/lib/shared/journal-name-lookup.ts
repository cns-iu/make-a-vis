import { chain, lookup, map, Operator } from '@ngx-dino/core';

import journalNameToIdLookup from '../data/journalNameToId.json';
import { normalizeJournalName } from './normalize-journal-name';

export const journalNameRawLookup: Operator<string, any> = lookup(journalNameToIdLookup);
export const journalNameLookup: Operator<string, any> = chain(map(normalizeJournalName), journalNameRawLookup);
