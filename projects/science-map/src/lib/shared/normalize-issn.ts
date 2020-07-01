export function normalizeIssn(name: string): string {
    return (name || '').replace(/\-/g, '');
}
