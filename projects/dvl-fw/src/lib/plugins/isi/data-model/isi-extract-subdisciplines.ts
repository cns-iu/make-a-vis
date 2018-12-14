// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Journal } from './isi-journal';
import { Subdiscipline, SubdisciplineStats } from './isi-subdiscipline';
import underlyingScimapData from './underlyingScimapData.data';

// TODO: @ngx-dino/science-map needs to be redone
const disciplineLookup = underlyingScimapData.disciplines.reduce((map, n) => {
  map[n.disc_id] = {
    id: n.disc_id,
    name: n.disc_name,
    color: n.color,
    x: n.x,
    y: n.y
  };
  return map;
}, {});
const subdisciplineLookup = underlyingScimapData.nodes.reduce((map, n) => {
  map[n.subd_id] = {
    id: n.subd_id,
    name: n.subd_name,
    Discipline: disciplineLookup[n.disc_id],
    x: n.x,
    y: n.y,
    size: n.size
  };
  return map;
}, {});

export function extractSubdisciplines(journals: Journal[]): Subdiscipline[] {
  const subdisciplines: any = {}, subdisciplineList: Subdiscipline[] = [];
  const globalStats = new SubdisciplineStats();

  for (const journal of journals) {
    let subdiscipline: Subdiscipline = subdisciplines[journal.subdisciplineId];
    if (!subdiscipline) {
      const subd_data = subdisciplineLookup[journal.subdisciplineId];
      subdiscipline = subdisciplines[journal.subdisciplineId] = new Subdiscipline(
        Object.assign({}, subd_data, {
          numPapers: 0,
          numCites: 0,
          firstYear: journal.firstYear || 0,
          lastYear: journal.lastYear || 0,
          globalStats
        })
      );
      subdisciplineList.push(subdiscipline);
    }
    subdiscipline.numPapers += journal.numPapers || 0;
    subdiscipline.numCites += journal.numCites || 0;
    if (journal.firstYear < subdiscipline.firstYear) {
      subdiscipline.firstYear = journal.firstYear;
    }
    if (journal.lastYear > subdiscipline.lastYear) {
      subdiscipline.lastYear = journal.lastYear;
    }
    journal.Subdiscipline = subdiscipline;
  }
  subdisciplineList.forEach(s => globalStats.count(s));
  return subdisciplineList;
}
