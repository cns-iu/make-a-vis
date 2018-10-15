import { parseISIFile } from './isi-record';
import { Author } from './isi-author';
import { CoAuthorLink } from './isi-coauthor-link';
import { Journal } from './isi-journal';
import { Publication } from './isi-publication';
import { extractAuthors } from './isi-extract-authors';
import { extractCoAuthorLinks } from './isi-extract-coauthor-links';
import { extractJournals } from './isi-extract-journals';
import { extractPublications } from './isi-extract-publications';

// @dynamic
export class ISIDatabase {
  publications: Publication[];
  journals: Journal[];
  authors: Author[];
  coAuthorLinks: CoAuthorLink[];

  static fromISIFile(isiFileContents: string): ISIDatabase {
    const records = parseISIFile(isiFileContents);
    const publications = extractPublications(records);
    const journals = extractJournals(publications);
    const authors = extractAuthors(publications);
    const coAuthorLinks = extractCoAuthorLinks(publications);

    return { journals, authors, coAuthorLinks, publications };
  }
  static fromJSON(data: any): ISIDatabase {
    return {
      journals: (data.journals || []).map(j => new Journal(j)),
      authors: (data.authors || []).map(a => new Author(a)),
      coAuthorLinks: (data.coAuthorLinks || []).map(c => new CoAuthorLink(c)),
      publications: (data.publications || []).map(p => new Publication(p))
    };
  }
}
