import { Publication } from './isi-publication';
import { Author, AuthorStats } from './isi-author';

export function extractAuthors(publications: Publication[]): Author[] {
  const authors: any = {}, authorList: Author[] = [];
  const globalStats = new AuthorStats();
  for (const pub of publications) {
    pub.authors.forEach((name, index) => {
      let author: Author = authors[name];
      if (!author) {
        author = authors[name] = new Author({
          name,
          fullname: pub.authorsFullname[index],
          numPapers: 0,
          numCites: 0,
          firstYear: pub.publicationYear || 0,
          lastYear: pub.publicationYear || 0,
          globalStats
        });
        authorList.push(author);
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
    });
    pub.Authors = pub.authors.map(a => authors[a]);
  }
  authorList.forEach(a => globalStats.count(a));
  return authorList;
}
