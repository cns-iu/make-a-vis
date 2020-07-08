import { ProjectionType } from 'vega';
import { VisualizationSpec } from 'vega-embed';

import { VisualizationEdge, VisualizationNode } from './interfaces';


export interface GeomapSpecOptions {
  nodes?: VisualizationNode[];
  edges?: VisualizationEdge[];
  basemap?: 'usa' | 'world';
  country?: string | number;
  state?: string | number;
  projection?: ProjectionType | 'eckert4' | string;
  enableZoomPan?: boolean;
  basemapZoomLevels?: unknown[];
  basemapSelectedZoomLevel?: number;
  basemapDefaultColor?: string;
  basemapDefaultTransparency?: number;
  basemapDefaultStrokeColor?: string;
  basemapDefaultStrokeWidth?: number;
  basemapDefaultStrokeDashArray?: string;
  basemapDefaultStrokeTransparency?: number;
}

export const DEFAULT_GEOMAP_SPEC_OPTIONS: GeomapSpecOptions = {
  basemapDefaultColor: 'white',
  basemapDefaultStrokeColor: '#bebebe',
  basemapDefaultStrokeWidth: 0.85,
  basemap: 'usa',
  projection: 'albersUsa'
};

export function geomapSpec(options: GeomapSpecOptions = {}, defaultOptions = DEFAULT_GEOMAP_SPEC_OPTIONS): VisualizationSpec {
  options = {...defaultOptions, ...options}; // Merge options

  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'US Map: This proportional symbol map shows 50 US states and other jurisdictions using the Albers equal-area conic projection (Alaska and Hawaii are inset). Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.<br><br>World Map: This proportional symbol map shows 252 countries of the world using the equal-area Eckert IV projection. Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.',
    autosize: {type: 'fit', resize: true},
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Draw countries
      {
        name: options.projection === 'albersUsa' ? 'delete-me' : 'countries',
        mark: {
          type: 'geoshape',
          fill: options.basemapDefaultColor, stroke: options.basemapDefaultStrokeColor, strokeWidth: options.basemapDefaultStrokeWidth
        },
        data: {
          url: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-${options.basemap === 'usa' ? 110 : 50}m.json`,
          format: {type: 'topojson', feature: 'countries'}
        },
        transform: [
          { 'filter': options.country === undefined ? 'true' :  `datum.id == '${options.country}' || datum.properties.name == '${options.country}'` } // United States of America
        ],
        projection: {type: options.projection as ProjectionType}
      },

      // Draw states
      {
        name: 'us-states',
        mark: {
          type: 'geoshape',
          fill: options.basemapDefaultColor, stroke: options.basemapDefaultStrokeColor, strokeWidth: options.basemapDefaultStrokeWidth
        },
        data: {
          url: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
          format: {type: 'topojson', feature: 'states'}
        },
        transform: [
          { 'filter': options.state === undefined ? 'true' :  `datum.id == '${options.state}' || datum.properties.name == '${options.state}'` } // United States of America
        ],
        projection: {type: options.projection as ProjectionType}
      },

      // Draw edges
      {
        name: 'edges',
        mark: 'rule',
        data: {name: 'edges'},
        projection: {type: options.projection as ProjectionType},
        transform: [
          {
            filter: 'isValid(datum.latitude1) && isValid(datum.latitude2) && isValid(datum.longitude1) && isValid(datum.longitude2)'
              + (options.projection === 'albersUsa' ? ' && datum.latitude1 > 18.8 && datum.latitude2 > 18.8' : '')
          },
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
        name: 'nodes',
        mark: 'point',
        data: {name: 'nodes'},
        projection: {type: options.projection as ProjectionType},
        transform: [
          {
            filter: 'isValid(datum.latitude)'
              + (options.projection === 'albersUsa' ? ' && datum.latitude > 18.8' : '')
          },
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
    ].filter(l => l.name !== 'delete-me') as any[],
    datasets: {
      nodes: options.nodes as any[] || undefined,
      edges: options.edges as any[] || undefined
    }
  };
}
