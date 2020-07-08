import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode, VisualizationEdge } from './interfaces';


export interface NetworkSpecOptions {
  nodes?: VisualizationNode[];
  edges?: VisualizationEdge[];
  enableTooltip?: boolean;
}

export function networkSpec(options: NetworkSpecOptions = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'This network visualization presents nodes connected by links. ForceAtlas2, a force-directed layout algorithm, is used to position nodes in two-dimensional space. The algorithm aims to minimize edge crossings and to place nodes so that all edges are of more or less equal length. Nodes can be size and color coded, and edges can be thickness and color coded. An additional data variable can be presented through tooltips on the nodes.',
    autosize: {type: 'fit', resize: true},
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Draw edges
      {
        mark: 'rule',
        data: {name: 'edges'},
        transform: [
          {
            calculate: '!isValid(datum.tooltip) ? \'\' : datum.tooltip',
            as: 'tooltip'
          },
          {
            calculate: '!isValid(datum.strokeWidth) ? 1 : datum.strokeWidth',
            as: 'strokeWidth'
          },
          {
            calculate: '!isValid(datum.transparency) ? 1 : 1 - datum.transparency',
            as: 'opacity'
          },
        ],
        encoding: {
          x: {field: 'sourceX', type: 'quantitative', axis: null},
          y: {field: 'sourceY', type: 'quantitative', axis: null},
          x2: {field: 'targetX', type: 'quantitative'},
          y2: {field: 'targetY', type: 'quantitative'},
          color: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          opacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          tooltip: options.enableTooltip !== false ? {field: 'tooltip', type: 'nominal'} : undefined
        }
      },

      // Draw nodes
      {
        mark: 'point',
        data: {name: 'nodes'},
        transform: [
          {
            calculate: '!isValid(datum.tooltip) ? \'\' : datum.tooltip',
            as: 'tooltip'
          },
          {
            calculate: '!isValid(datum.strokeWidth) ? 1 : datum.strokeWidth',
            as: 'strokeWidth'
          },
          {
            calculate: '!isValid(datum.strokeTransparency) ? 0.9 : 1 - datum.strokeTransparency',
            as: 'strokeOpacity'
          },
          {
            calculate: '!isValid(datum.transparency) ? 0.75 : 1 - datum.transparency',
            as: 'opacity'
          },
        ],
        encoding: {
          x: {field: 'x', type: 'quantitative', axis: null},
          y: {field: 'y', type: 'quantitative', axis: null},
          shape: {field: 'shape', type: 'nominal', scale: null},
          fill: {field: 'color', type: 'nominal', scale: null},
          fillOpacity: {field: 'opacity', type: 'quantitative', scale: null},
          stroke: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          strokeOpacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          size: {field: 'areaSize', type: 'quantitative', scale: null},
          tooltip: options.enableTooltip !== false ? {field: 'tooltip', type: 'nominal'} : undefined
        }
      }
    ],
    datasets: {
      nodes: options.nodes as any[] || undefined,
      edges: options.edges as any[] || undefined
    }
  };
}
