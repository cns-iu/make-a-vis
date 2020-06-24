import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';

import { Author } from './isi-author';
import { CoAuthorLink } from './isi-coauthor-link';

export function layoutCoAuthorNetwork(authors: Author[], links: CoAuthorLink[]) {
  const graph = new Graph();
  for (const author of authors) {
    graph.addNode(author.name, {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      size: author.numCitesAreaSize
    });
  }
  for (const link of links) {
    graph.addUndirectedEdgeWithKey(link.identifier, link.Author1.name, link.Author2.name, {weight: link.numPapersStrokeWidth});
  }

  const settings = forceAtlas2.inferSettings(graph);
  const positions = forceAtlas2(graph, {iterations: 500, settings});

  for (const author of authors) {
    if (positions[author.name]) {
      const {x, y} = positions[author.name];
      author.position = [x, y];
    }
  }
}
