// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Author } from './isi-author';
import { CoAuthorLink } from './isi-coauthor-link';
import { extractAuthors } from './isi-extract-authors';
import { extractCoAuthorLinks } from './isi-extract-coauthor-links';
import { extractJournals } from './isi-extract-journals';
import { extractPublications } from './isi-extract-publications';
import { extractSubdisciplines } from './isi-extract-subdisciplines';
import { Journal } from './isi-journal';
import { layoutCoAuthorNetwork } from './isi-layout-coauthor-network';
import { Publication } from './isi-publication';
import { parseISIFile } from './isi-record';
import { Subdiscipline } from './isi-subdiscipline';

// @dynamic
export class ISIDatabase {
  publications: Publication[];
  journals: Journal[];
  subdisciplines: Subdiscipline[];
  authors: Author[];
  coAuthorLinks: CoAuthorLink[];

  static fromISIFile(isiFileContents: string): ISIDatabase {
    const records = parseISIFile(isiFileContents);
    const publications = extractPublications(records);
    const journals = extractJournals(publications);
    const subdisciplines = extractSubdisciplines(journals);
    const authors = extractAuthors(publications);
    const coAuthorLinks = extractCoAuthorLinks(publications);
    layoutCoAuthorNetwork(authors, coAuthorLinks);

    return { journals, authors, subdisciplines, coAuthorLinks, publications };
  }
  static fromJSON(data: any): ISIDatabase {
    return {
      journals: (data.journals || []).map(j => new Journal(j)),
      authors: (data.authors || []).map(a => new Author(a)),
      subdisciplines: (data.subdisciplines || []).map(s => new Subdiscipline(s)),
      coAuthorLinks: (data.coAuthorLinks || []).map(c => new CoAuthorLink(c)),
      publications: (data.publications || []).map(p => new Publication(p))
    };
  }
}
