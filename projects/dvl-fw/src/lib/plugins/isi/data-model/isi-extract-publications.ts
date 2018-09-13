import { ISIRecord } from './isi-record';
import { Publication, PublicationStats } from './isi-publication';

export function extractPublications(publications: ISIRecord[]): Publication[] {
  const publicationList: Publication[] = [];
  const globalStats = new PublicationStats();
  for (const pub of publications) {
    const publication = new Publication(
      Object.assign({}, pub, { globalStats })
    );
    publicationList.push(publication);
  }
  publicationList.forEach(a => globalStats.count(a));
  return publicationList;
}
