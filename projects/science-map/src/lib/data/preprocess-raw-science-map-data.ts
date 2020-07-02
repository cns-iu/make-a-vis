import { writeFileSync } from 'fs';
import { getIdTable, getIssnTable, getNameTable } from './raw-science-map-operators';


function writeJSON(outputFile: string, obj: any) {
  writeFileSync(outputFile, JSON.stringify(obj, null, 0), 'utf8');
}
function writeTSJSON(outputFile: string, obj: any) {
  const json = JSON.stringify(obj, null, 0);
  writeFileSync(outputFile, '// tslint:disable\nexport default JSON.parse(`' + json + '`);' , 'utf8');
}

writeJSON(`${__dirname}/journalNameToId.json`, getNameTable().toJS());
writeJSON(`${__dirname}/issnToJournIdLookup.json`, getIssnTable().toJS());
writeJSON(`${__dirname}/journIdToSubdLookup.json`, getIdTable().toJS());

// writeTSJSON(`${__dirname}/journalNameToId.data.ts`, getNameTable().toJS());
// writeTSJSON(`${__dirname}/issnToJournIdLookup.data.ts`, getIssnTable().toJS());
// writeTSJSON(`${__dirname}/journIdToSubdLookup.data.ts`, getIdTable().toJS());
