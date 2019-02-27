import { intersectionBy, trim as loTrim, trimEnd } from 'lodash';

const nsfHeaderSet: Array<string> = Array<string>('AwardNumber', 'Title', 'PrincipalInvestigator', 'PIEmailAddress', 'Co-PIName(s)',
'Organization', 'OrganizationStreet', 'OrganizationCity', 'OrganizationState', 'OrganizationZip', 'OrganizationPhone',
'StartDate', 'ExpirationDate', 'EndDate', 'LastAmendmentDate', 'AwardInstrument', 'AwardedAmountToDate', 'ARRAAmount', 'NSFOrganization',
'Program(s)', 'ProgramManager', 'NSFDirectorate', 'ProgramElementCode(s)', 'ProgramReferenceCode(s)', 'Abstract');
const missingHeadertolerance = 0; // number of missing headers allowed

/**
 * Determines whether csv file is nsf template compatible.
 * reads the first row of the file then creates an array of strings (headers),
 * these two arrays are then fed into lodash 'intersectionBy' which returns an array of headers matched between the two.
 * Tolerance specifies how many missing standard nsf headers are allowed.
 * @example if the tolerance is 1, then 1 missing header will be tolerated.
 * @param fileContents contents of the file.
 * @returns true of false
 */
export function isNSFCompatibleCSV(fileContents: string): boolean {

    // get the first row
    const fileHeader = fileContents.substring(0, fileContents.indexOf('\n'));
    // get headers from first row
    const fileHeaderSet: Array<string> = fileHeader.split(',');
    const matchedHeaders: Array<string> = intersectionBy(nsfHeaderSet, fileHeaderSet, conditionBy);
    console.log( matchedHeaders.length, nsfHeaderSet.length,  matchedHeaders, nsfHeaderSet);
    return matchedHeaders.length === nsfHeaderSet.length - missingHeadertolerance;
}

/**
 * lodash 'intersectionBy' accepts this callback function.
 * @param header is one header out of array of headers.
 * @returns double quote trimmed and \r removed (DOS line ending) header.
 */
function conditionBy(header: string): string {
    return loTrim(trimEnd(header, '\r'), '"');
}
