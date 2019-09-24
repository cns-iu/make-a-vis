import { parse } from '@dvl-fw/core';
import { access, chain, combine, map, Operator } from '@ngx-dino/core';

const csvfields = [
  'AwardNumber', 'Title', 'NSFOrganization', 'Program(s)', 'StartDate', 'LastAmendmentDate',
  'PrincipalInvestigator', 'State', 'Organization', 'AwardInstrument', 'ProgramManager', 'EndDate',
  'AwardedAmountToDate', 'Co-PIName(s)', 'PIEmailAddress', 'OrganizationStreet', 'OrganizationCity',
  'OrganizationState', 'OrganizationZip', 'OrganizationPhone', 'NSFDirectorate', 'ProgramElementCode(s)',
  'ProgramReferenceCode(s)', 'ARRAAmount', 'Abstract'
];

function splitTrim(field: string, separator = ','): Operator<any, string[]> {
  return chain(access(field), map<string, string[]>(s => (s || '').split(separator).map(t => t.trim()).filter(u => !!u)));
}

function firstValid<T>(...operators: Operator<any, T>[]): Operator<any, T> {
  return map((s) => {
    for (const op of operators) {
      const value = op.get(s);
      if (value !== undefined) {
        return value;
      }
    }
    return undefined;
  });
}

function date(field: string): Operator<any, Date> {
  return chain(access(field), map<string, Date>(s => String(new Date(s || undefined)) === 'Invalid Date' ? undefined : new Date(s)));
}

function year(field: string): Operator<any, number> {
  return chain(date(field), map<Date, number>(s => s ? s.getFullYear() : undefined));
}

function usDollars(field: string): Operator<any, number> {
  return chain(access(field), map<string, number>(s => Number((s || '').replace(/[^0-9\.]/g, '')) || 0));
}

function padLeft(nr: number, n: number, str = '0') {
  return Array(Math.max(0, n - String(nr).length + 1)).join(str) + nr;
}

const zip5: Operator<string, string> = map(s => {
  s = (s || '').trim().replace(/[^\d]/g, '');
  if (s.length === 5) {
    return s;
  } else if (s.length === 0) {
    return undefined;
  } else {
    return padLeft(Number(s), 9).slice(0, 5);
  }
});

export interface NSFRecord {
  id: string;
  title: string;

  piName: string;
  piEmailAddress: string;
  coPiNames: string[];

  organization: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    zip5: string;
    phone: string;
  };

  startDate: Date;
  endDate: Date;
  lastAmendmentDate: Date;
  startYear: number;
  endYear: number;
  lastAmendmentYear: number;

  awardInstrument: string;
  awardedAmountToDate: number;
  arraAmount: number;

  nsfOrganization: string;
  nsfPrograms: string[];
  nsfProgramManager: string;
  nsfDirectorate: string;
  programElementCodes: string[];
  programReferenceCodes: string[];

  abstract: string;
}

const nsfParseOp: Operator<any, NSFRecord> = combine({
  'id': access('AwardNumber'),
  'title': access('Title'),

  'piName': access('PrincipalInvestigator'),
  'piEmailAddress': access('PIEmailAddress'),
  'coPiNames': splitTrim('Co-PIName(s)'),

  // 'state': access('State'), Redundant with OrganizationState
  'organization': {
    'name': access('Organization'),
    'street': access('OrganizationStreet'),
    'city': access('OrganizationCity'),
    'state': access('OrganizationState'),
    'zip': access('OrganizationZip'),
    'zip5': chain(access('OrganizationZip'), zip5),
    'phone': access('OrganizationPhone'),
  },

  'startDate': date('StartDate'),
  'endDate': firstValid(date('EndDate'), date('ExpirationDate')),
  'lastAmendmentDate': date('LastAmendmentDate'),
  'startYear': year('StartDate'),
  'endYear': firstValid(year('EndDate'), year('ExpirationDate')),
  'lastAmendmentYear': year('LastAmendmentDate'),

  'awardInstrument': access('AwardInstrument'),
  'awardedAmountToDate': usDollars('AwardedAmountToDate'),
  'arraAmount': usDollars('ARRAAmount'),

  'nsfOrganization': access('NSFOrganization'),
  'nsfPrograms': splitTrim('Program(s)'),
  'nsfProgramManager': access('ProgramManager'),
  'nsfDirectorate': access('NSFDirectorate'),
  'programElementCodes': splitTrim('ProgramElementCode(s)'),
  'programReferenceCodes': splitTrim('ProgramReferenceCode(s)'),

  'abstract': access('Abstract')
});

export function parseNSFFile(fileContents: string): NSFRecord[] {
  return parse(fileContents, { header: true }).data.map(nsfParseOp.getter).filter(s => !!s.id);
}
