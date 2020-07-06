export const journalExpansions = {
  'of': ' ',
  'the': ' ',
  'on': ' ',
  'and': ' ',
  '&': ' '
};
export function normalizeJournalName(name: string): string {
  return String(name).toLowerCase()
    .replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
    .split(/\s/).map(s => (journalExpansions[s] || s).trim())
    .filter((str) => str.length !== 0).join(' ');
}
