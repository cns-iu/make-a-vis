// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Graph } from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';

import { Investigator } from './nsf-investigator';
import { CoPiLink } from './nsf-copi-link';

export function layoutCoPiNetwork(nodes: Investigator[], links: CoPiLink[]) {
  const graph = new Graph();
  for (const node of nodes) {
    graph.addNode(node.name, {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      size: node.numAwardsAreaSize
    });
  }
  for (const link of links) {
    graph.addUndirectedEdgeWithKey(link.identifier, link.Investigator1.name, link.Investigator2.name, {weight: link.numAwardsStrokeWidth});
  }

  const settings = forceAtlas2.inferSettings(graph);
  const positions = forceAtlas2(graph, {iterations: 500, settings});

  for (const node of nodes) {
    if (positions[node.name]) {
      const {x, y} = positions[node.name];
      node.position = [x, y];
    }
  }
}
