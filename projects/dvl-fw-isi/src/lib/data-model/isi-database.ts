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
import { Geocoder, DefaultGeocoder } from 'geocoder-ts';

// @dynamic
export class ISIDatabase {
  publications: Publication[];
  journals: Journal[];
  subdisciplines: Subdiscipline[];
  authors: Author[];
  coAuthorLinks: CoAuthorLink[];

  constructor(data: { publications: Publication[], journals: Journal[], subdisciplines: Subdiscipline[],
      authors: Author[], coAuthorLinks: CoAuthorLink[] }, reconstitue?: boolean) {
    Object.assign(this, data);
    if (reconstitue) {
      this.reconstitute();
    }
  }

  static async fromISIFile(isiFileContents: string, geocoder: Geocoder = new DefaultGeocoder()): Promise<ISIDatabase> {
    const records = parseISIFile(isiFileContents);
    const publications = extractPublications(records);
    const journals = extractJournals(publications);
    const subdisciplines = extractSubdisciplines(journals);
    const authors = await extractAuthors(publications, geocoder);
    const coAuthorLinks = extractCoAuthorLinks(publications);
    layoutCoAuthorNetwork(authors, coAuthorLinks);

    return new ISIDatabase({ journals, authors, subdisciplines, coAuthorLinks, publications });
  }

  static fromJSON(data: any): ISIDatabase {
    return new ISIDatabase({
      journals: (data.journals || []).map(j => new Journal(j)),
      authors: (data.authors || []).map(a => new Author(a)),
      subdisciplines: (data.subdisciplines || []).map(s => new Subdiscipline(s)),
      coAuthorLinks: (data.coAuthorLinks || []).map(c => new CoAuthorLink(c)),
      publications: (data.publications || []).map(p => new Publication(p))
    }, true);
  }

  private reconstitute() {
    const journals = this.journals.reduce((acc, val) => {
      acc[val.name] = val;
      return acc;
    }, {});
    const subdisciplines = this.subdisciplines.reduce((acc, val) => {
      acc[val.id] = val;
      return acc;
    }, {});
    const authors = this.authors.reduce((acc, val) => {
      acc[val.name] = val;
      return acc;
    }, {});

    this.publications.forEach(p => {
      p.Authors = p.authors.map(a => authors[a]);
      p.Journal = journals[p.journalName];
    });
    this.journals.forEach(j => j.Subdiscipline = subdisciplines[j.subdisciplineId]);
    this.coAuthorLinks.forEach(co => {
      co.Author1 = authors[co.author1];
      co.Author2 = authors[co.author2];
    });
  }
}
