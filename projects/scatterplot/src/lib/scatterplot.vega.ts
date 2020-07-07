import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';


export interface ScatterplotSpecOptions {
  nodes?: VisualizationNode[];
  enableTooltip?: boolean;
  strokeWidth?: number;
  gridlines?: boolean;
  gridlinesColor?: string;
  gridlinesOpacity?: number;
  tickLabelColor?: string;
  showTicks?: boolean;
  showAxisLabels?: boolean;
  shape?: string;
  areaSize?: number;
  color?: string;
  strokeColor?: string;
  transparency?: number;
  strokeTransparency?: number;
}

export function scatterplotSpec(options: ScatterplotSpecOptions = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A scatter graph visualization uses Cartesian coordinates as a reference system. In the current MAV, records are represented by circles. Circles are placed based on values for two data variables: one plotted along the x-axis, the other along the y-axis. Circles can be size coded and color coded to represent additional data variables. A third data variable can be added to the graph using tooltips for circles.',
    autosize: {type: 'fit', resize: true},
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    padding: 16,
    layer: [
      // Draw nodes
      {
        mark: {type: 'point', strokeWidth: options.strokeWidth},
        data: {name: 'nodes'},
        transform: [
          {
            calculate: '!isValid(datum.tooltip) ? \'\' : datum.tooltip',
            as: 'tooltip'
          },
          {
            calculate: '!isValid(datum.strokeWidth) ? 1.5 : datum.strokeWidth',
            as: 'strokeWidth'
          },
          {
            calculate: '!isValid(datum.strokeTransparency) ? 0.9 : 1 - datum.strokeTransparency',
            as: 'strokeOpacity'
          },
          {
            calculate: '!isValid(datum.transparency) ? 0.75 : 1 - datum.transparency',
            as: 'opacity'
          }
        ],
        encoding: {
          x: {field: 'x', type: 'quantitative', scale: {zero: false}, title: null,
            axis: {
              grid: options.gridlines,
              gridColor: options.gridlinesColor,
              gridOpacity: options.gridlinesOpacity,
              ticks: options.showTicks,
              tickColor: options.tickLabelColor,
              domainWidth: 1,
              domainColor: 'black',
              tickMinStep: 2,
              labelAngle: 0,
              format: '1d',
              tickCount: 13
            }
          },
          y: {field: 'y', type: 'quantitative', scale: {zero: false}, title: null,
            axis: {
              grid: options.gridlines,
              gridColor: options.gridlinesColor,
              gridOpacity: options.gridlinesOpacity,
              ticks: options.showTicks,
              tickColor: options.tickLabelColor,
              domainWidth: 1,
              domainColor: 'black',
              tickMinStep: 2,
              format: '1d'
            }
          },
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
    ],
    datasets: {
      nodes: options.nodes as any[] || undefined
    }
  };
}
