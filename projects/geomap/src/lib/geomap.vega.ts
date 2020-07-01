import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode, VisualizationEdge } from './interfaces';


export interface GeomapSpecOptions {
  nodes?: VisualizationNode[];
  edges?: VisualizationEdge[];
}

export function geomapSpec(options: GeomapSpecOptions = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'US Map: This proportional symbol map shows 50 US states and other jurisdictions using the Albers equal-area conic projection (Alaska and Hawaii are inset). Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.<br><br>World Map: This proportional symbol map shows 252 countries of the world using the equal-area Eckert IV projection. Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.',
    autosize: {type: 'fit', resize: true},
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Draw states
      {
        mark: {type: 'geoshape', fill: 'white', stroke: '#bebebe', strokeWidth: 0.5},
        data: {
          url: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
          format: {type: 'topojson', feature: 'states'}
        },
        projection: {type: 'albersUsa'}
      },

      // Draw edges
      {
        mark: 'rule',
        data: {name: 'edges', values: options.edges as any[] || undefined},
        projection: {type: 'albersUsa'},
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
          longitude: {field: 'longitude1', type: 'quantitative'},
          latitude: {field: 'latitude1', type: 'quantitative'},
          longitude2: {field: 'longitude2', type: 'quantitative'},
          latitude2: {field: 'latitude2', type: 'quantitative'},
          color: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          opacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          tooltip: {field: 'tooltip', type: 'nominal'}
        }
      },

      // Draw nodes
      {
        mark: 'point',
        data: {name: 'nodes', values: options.nodes as any[] || undefined},
        projection: {type: 'albersUsa'},
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
          longitude: {field: 'longitude', type: 'quantitative'},
          latitude: {field: 'latitude', type: 'quantitative'},
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
