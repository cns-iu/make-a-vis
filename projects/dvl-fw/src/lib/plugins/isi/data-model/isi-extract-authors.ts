import { ISIRecord } from './isi-record';
import { Author, AuthorStats } from './isi-author';

export function extractAuthors(publications: ISIRecord[]): Author[] {
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
          firstYear: pub.publicationYear,
          lastYear: pub.publicationYear,
          globalStats
        });
        authorList.push(author);
      }

      author.numPapers++;
      author.numCites += pub.numCites || 0;
      if (pub.publicationYear < author.firstYear) {
        author.firstYear = pub.publicationYear;
      }
      if (pub.publicationYear > author.lastYear) {
        author.lastYear = pub.publicationYear;
      }
    });
  }
  authorList.forEach(a => globalStats.count(a));
  return authorList;
}
