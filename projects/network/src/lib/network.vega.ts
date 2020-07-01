import { VisualizationSpec } from 'vega-embed';

export interface NetworkSpecOptions {
  nodes?: unknown[];
  edges?: unknown[];
}

export function networkSpec(options: NetworkSpecOptions = {}): VisualizationSpec {
  const xAxis = {minExtent: 90, maxExtent: 515, grid: false, ticks: false, labels: false, domain: false, title: null};
  const yAxis = {minExtent: 0, maxExtent: 275, grid: false, ticks: false, labels: false, domain: false, title: null};
  const xScale = {domain: [xAxis.minExtent, xAxis.maxExtent]};
  const yScale = {domain: [yAxis.minExtent, yAxis.maxExtent]};

  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'This network visualization presents nodes connected by links. ForceAtlas2, a force-directed layout algorithm, is used to position nodes in two-dimensional space. The algorithm aims to minimize edge crossings and to place nodes so that all edges are of more or less equal length. Nodes can be size and color coded, and edges can be thickness and color coded. An additional data variable can be presented through tooltips on the nodes.',
    autosize: {
      type: 'fit',
      resize: true,
      contains: 'padding'
    },
    padding: 8,
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Drawn nodes
      {
        mark: 'point',
        data: {name: 'nodes', values: options.nodes as any[] || undefined},
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
          x: {field: 'x', type: 'quantitative'},
          y: {field: 'y', type: 'quantitative'},
          shape: {field: 'shape', type: 'nominal', scale: null},
          fill: {field: 'color', type: 'nominal', scale: null},
          fillOpacity: {field: 'opacity', type: 'quantitative', scale: null},
          stroke: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          strokeOpacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          size: {field: 'areaSize', type: 'quantitative', scale: null},
          tooltip: {field: 'tooltip', type: 'nominal'}
        }
      }
    ]
  };
}
