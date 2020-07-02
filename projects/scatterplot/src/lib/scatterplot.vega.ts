import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';


export interface ScatterplotSpecOptions {
  nodes?: VisualizationNode[];
}

export function scatterplotSpec(options: ScatterplotSpecOptions = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A scatter graph visualization uses Cartesian coordinates as a reference system. In the current MAV, records are represented by circles. Circles are placed based on values for two data variables: one plotted along the x-axis, the other along the y-axis. Circles can be size coded and color coded to represent additional data variables. A third data variable can be added to the graph using tooltips for circles.',
    autosize: {type: 'fit', resize: true},
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Draw nodes
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
          x: {field: 'x', type: 'ordinal'},
          y: {field: 'y', type: 'ordinal'},
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
