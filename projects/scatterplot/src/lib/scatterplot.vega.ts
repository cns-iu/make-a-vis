import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';


export interface ScatterplotSpecOptions {
  nodes?: VisualizationNode[];
  enableTooltip?: boolean;
  enableZoomPan?: boolean;
  xAxisArrow?: boolean; // TODO: Create X-Axis Arrow
  yAxisArrow?: boolean; // TODO: Create Y-Axis Arrow
  gridlines?: boolean;
  gridlinesColor?: string;
  gridlinesOpacity?: number;
  tickLabelColor?: string;
  showAxisIndicators?: boolean; // TODO: Toggle texts over axes indicating the type of axis.
  showAxisLabels?: boolean; // TODO: allow axis labels to be used/passed in
  showTicks?: boolean;
}

export function scatterplotSpec(options: ScatterplotSpecOptions = {}): VisualizationSpec {
  options = {
    ...{
      enableTooltip: true,
      xAxisArrow: true,
      yAxisArrow: true,
      gridlines: true,
      gridlinesColor: 'lightgrey',
      gridlinesOpacity: 0.7,
      tickLabelColor: 'lightblack',
      showAxisIndicators: false,
      showAxisLabels: false
    },
    ...options
  };

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
        mark: {type: 'point'},
        data: {name: 'nodes'},
        selection: options.enableZoomPan ? {grid: {type: 'interval', bind: 'scales'}} : undefined,
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
          x: {field: 'x', type: 'quantitative', scale: {zero: false},
            title: options.showAxisLabels === true ? undefined : null,
            axis: {
              grid: !!options.gridlines,
              gridColor: options.gridlinesColor || undefined,
              gridOpacity: options.gridlinesOpacity || undefined,
              ticks: !!options.showTicks,
              tickColor: options.tickLabelColor || undefined,
              domainWidth: 1,
              domainColor: 'black',
              labelAngle: 0,
              labelPadding: 8,
              tickMinStep: 2,
              // poor man's way to format 'year' correctly
              labelExpr: 'datum.value < 3000 && datum.value > 1000 ? datum.value : datum.label'
            }
          },
          y: {field: 'y', type: 'quantitative', scale: {zero: false},
            title: options.showAxisLabels === true ? undefined : null,
            axis: {
              grid: !!options.gridlines,
              gridColor: options.gridlinesColor || undefined,
              gridOpacity: options.gridlinesOpacity || undefined,
              ticks: !!options.showTicks,
              tickColor: options.tickLabelColor || undefined,
              domainWidth: 1,
              domainColor: 'black',
              labelPadding: 8,
              tickMinStep: 2,
              // poor man's way to format 'year' correctly
              labelExpr: 'datum.value < 3000 && datum.value > 1000 ? datum.value : datum.label'
            }
          },
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
      nodes: options.nodes as any[] || undefined
    }
  };
}
