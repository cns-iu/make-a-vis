import { differenceBy, toLower, trim as loTrim, trimEnd } from 'lodash';

const nsfHeaderSet: Array<string> = Array<string>('AwardNumber', 'Title', 'NSFOrganization', 'Program(s)', 'StartDate', 'LastAmendmentDate',
'PrincipalInvestigator', 'PI', 'AllPI', 'State', 'Organization', 'AwardInstrument', 'ProgramManager', 'EndDate', 'AwardedAmountToDate',
'Co-PIName(s)', 'PIEmailAddress', 'OrganizationStreet', 'OrganizationCity', 'OrganizationState', 'OrganizationZip', 'OrganizationPhone',
'NSFDirectorate', 'ProgramElementCode(s)', 'ProgramReferenceCode(s)', 'ARRAAmount', 'Abstract');
const tolerance = 0; // %


/**
 * Determines whether csv file is nsf template compatible.
 * reads the first row of the file then creates an array of strings (headers),
 * these two arrays are then fed into lodash 'differenceBy' which returns an array of headers not matched between the two.
 * Tolerance specifies how many unmatched headers are allowed.
 * @example if length of unmatched headers is 10, and if the tolerance is 10%, then 1  unmatched header will be tolerated.
 * @param fileContents contents of the file.
 * @returns true of false
 */
export function isNSFCompatibleCSV(fileContents: string): boolean {

    // get the first row
    const fileHeader = fileContents.substring(0, fileContents.indexOf('\n'));
    // get headers from first row
    const fileHeaderSet: Array<string> = fileHeader.split(',');
    const unmatchedHeaders: Array<string> = differenceBy(nsfHeaderSet, fileHeaderSet, conditionBy);
    return unmatchedHeaders.length === unmatchedHeaders.length * Math.round((tolerance) / 100);
}

/**
 * lodash differenceBy accepts this callback function.
 * @param header is one header out of array of headers.
 * @returns lowercased, double quote trimmed and \r removed (DOS line ending) header.
 */
function conditionBy(header: string): string {
    return toLower(loTrim(trimEnd(header, '\r'), '"'));
}
