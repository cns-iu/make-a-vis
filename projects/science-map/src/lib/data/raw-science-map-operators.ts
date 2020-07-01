import { access, chain, combine, lookup, map, Operator } from '@ngx-dino/core';
import { Map } from 'immutable';
import * as libXLSX from 'xlsx';

import { normalizeIssn } from '../shared/normalize-issn';
import { normalizeJournalName } from '../shared/normalize-journal-name';

// Types and interfaces
export interface NameTableValue {
  id: number;
}

export interface IdTableValue {
  subd_id: number;
  // name: string;
  weight: number;
}

function numberAccess(field: string): Operator<any, Number> {
  return chain(access(field), map(Number));
}

// Constants
const mapperFilePath = `${__dirname}/UCSDmapDataTables.xlsx`;

const nameTableName = 'Table 7';
const nameTableStart = 'A13';
const nameTableExtractor = combine<any, [string, NameTableValue]>([
  chain(access('journal_name'), map(normalizeJournalName)),
  {
    id: numberAccess('journ_id')
  }
]);

const issnTableName = 'Table 5';
const issnTableStart = 'A13';
const issnTableExtractor = combine<any, [string, NameTableValue]>([
  chain(access('ISSN'), map(normalizeIssn)),
  {
    id: numberAccess('journ_id')
  }
]);

const idTableName = 'Table 4';
const idTableStart = 'A13';
const idTableExtractor = combine<any, [number, IdTableValue]>([
  numberAccess('journ_id'),
  {
    subd_id: numberAccess('subd_id'),
    // name: access('formal_name'),
    weight: numberAccess('jfraction')
  }
]);


// Lazily initialized
let rawNameTable: libXLSX.WorkSheet;
let nameTable: Map<string, NameTableValue>;

let rawIssnTable: libXLSX.WorkSheet;
let issnTable: Map<string, NameTableValue>;

let rawIdTable: libXLSX.WorkSheet;
let idTable: Map<number, IdTableValue[]>;


// Loading and parsing
function loadRawTables(): void {
  const workbook = libXLSX.readFile(mapperFilePath);

  rawNameTable = workbook.Sheets[nameTableName];
  rawIssnTable = workbook.Sheets[issnTableName];
  rawIdTable = workbook.Sheets[idTableName];
}

function loadNameTable(): void {
  if (nameTable !== undefined) {
    return;
  } else if (rawNameTable === undefined) {
    loadRawTables();
  }

  nameTable = parse(rawNameTable, nameTableStart, nameTableExtractor);
  rawNameTable = undefined;
}

function loadIssnTable(): void {
  if (issnTable !== undefined) {
    return;
  } else if (rawIssnTable === undefined) {
    loadRawTables();
  }

  issnTable = parse(rawIssnTable, issnTableStart, issnTableExtractor);
  rawIssnTable = undefined;
}

function loadIdTable(): void {
  if (idTable !== undefined) {
    return;
  } else if (rawIdTable === undefined) {
    loadRawTables();
  }

  idTable = parse2(rawIdTable, idTableStart, idTableExtractor);
  rawIdTable = undefined;
}

function parse<K, V>(
  sheet: libXLSX.WorkSheet, start: string, extractor: Operator<any, [K, V]>
): Map<K, V> {
  const range = sheet['!ref'].replace('A1', start);
  const jsonData = libXLSX.utils.sheet_to_json(sheet, {range});

  return Map(jsonData.map(extractor.getter));
}

function parse2<K, V>(
  sheet: libXLSX.WorkSheet, start: string, extractor: Operator<any, [K, V]>
): Map<K, V[]> {
  const range = sheet['!ref'].replace('A1', start);
  const jsonData = libXLSX.utils.sheet_to_json(sheet, {range});

  return Map<K, V[]>().withMutations((mapData) => {
    jsonData.map(extractor.getter).forEach(([key, value]) => {
      mapData.update(key, (values = []) => {
        values.push(value);
        return values;
      });
    });
  });
}

export function getNameTable(): Map<string, NameTableValue> {
  loadNameTable();
  return nameTable;
}

export function getIssnTable(): Map<string, NameTableValue> {
  loadIssnTable();
  return issnTable;
}

export function getIdTable(): Map<number, IdTableValue[]> {
  loadIdTable();
  return idTable;
}

export const journalLookup = chain(map(normalizeJournalName), lookup(getNameTable().toJS()));
export const issnLookup = chain(map(normalizeIssn), lookup(getIssnTable().toJS()));
export const disciplineLookup = lookup(getIdTable().toJS());
