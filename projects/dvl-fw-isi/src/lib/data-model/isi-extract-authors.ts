import { Author, AuthorStats } from './isi-author';
import { Publication } from './isi-publication';
import { DefaultGeocoder } from 'geocoder-ts';

export async function extractAuthors(publications: Publication[], maboxGeocodingEnabled: boolean): Promise<Author[]> {
  const authors: any = {}, authorList: Author[] = [];
  const globalStats = new AuthorStats();
  const geocoder = new DefaultGeocoder();

  for (const pub of publications) {
    // pub.authors.forEach(async (name, index) => {
    for (const [index, name] of pub.authors.entries()) {
      let author: Author = authors[name];

      // Address also includes name in [brackets]. Strip those out.
      const address = pub.authorsAddress[index] ? pub.authorsAddress[index].split(/\]/, 2).slice(-1)[0].trim() : undefined;
      if (!author) {
        author = authors[name] = new Author({
          name,
          fullname: pub.authorsFullname[index] || name,
          numPapers: 0,
          numCites: 0,
          firstYear: pub.publicationYear || 0,
          lastYear: pub.publicationYear || 0,
          address,
          location: undefined,
          globalStats
        });
        authorList.push(author);
      }

      if (!author.location && address) {
        author.location = await geocoder.getLocation(address.split(/\,/).slice(-4).join(','));
        if (author.location) {
          // Replace address with the more 'accurate' version.
          author.address = address;

          // Give each author a unique location object.
          // Not totally necessary but makes debugging easier.
          author.location = Object.assign({}, author.location);
        }
      }

      author.numPapers++;
      author.numCites += pub.numCites || 0;
      if (pub.publicationYear) {
        if (pub.publicationYear < author.firstYear) {
          author.firstYear = pub.publicationYear;
        }
        if (pub.publicationYear > author.lastYear) {
          author.lastYear = pub.publicationYear;
        }
      }
    }
    pub.Authors = pub.authors.map(a => authors[a]);
  }
  authorList.forEach(a => globalStats.count(a));
  return authorList;
}
