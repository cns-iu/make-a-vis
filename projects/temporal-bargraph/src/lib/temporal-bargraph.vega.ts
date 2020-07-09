import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';


export interface TemporalBargraphSpecOptions {
  nodes?: VisualizationNode[];
}

export function temporalBargraphSpec(options: TemporalBargraphSpecOptions = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A temporal bar graph is a visualization where each record is presented as a labeled horizontal bar with a specific start and end date. The area of each bar encodes a numerical attribute value (e.g., total amount of funding). Bars may be color coded to present categorical attribute values of records. An additional variable can be presented through tooltips on the bars.',
    autosize: {
      type: 'fit',
      resize: true
    },
    width: 'container',
    height: 'container',
    config: {
      view: {
        strokeOpacity: 0
      }
    },

    data: {
      name: 'nodes'
    },

    transform: [
      {
        calculate: `'' + datum['y-order'] + '-' + datum.identifier`,
        as: 'order'
      },
      {
        calculate: `!isValid(datum.tooltip) ? '' : datum.tooltip`,
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
      x: {
        field: 'x-start',
        type: 'ordinal',
        axis: {domain: false, ticks: false, grid: true, labelAngle: 0}
      },
      y: {
        field: 'order',
        type: 'ordinal',
        sort: '-x',
        axis: null,
        title: null
      }
    },

    layer: [
      // Bars
      {
        mark: 'bar',
        encoding: {
          x2: { field: 'x-end' },
          fill: { field: 'color', type: 'nominal', scale: null },
          fillOpacity: { field: 'opacity', type: 'quantitative', scale: null },
          stroke: { field: 'strokeColor', type: 'nominal', scale: null },
          strokeWidth: { field: 'strokeWidth', type: 'quantitative', scale: null },
          strokeOpacity: { field: 'strokeOpacity', type: 'quantitative', scale: null },
          size: { field: 'areaSize', type: 'quantitative', legend: null /*, scale: null */ },
          tooltip: { field: 'tooltip', type: 'nominal' }
        }
      },
      // Labels
      {
        mark: {
          type: 'text',
          align: 'right',
          baseline: 'middle',
          dx: -3,
          limit: 150,
          fontSize: 7
        },
        encoding: {
          text: {
            field: 'label',
            type: 'nominal'
          },
          tooltip: {
            field: 'label',
            type: 'nominal'
          }
        }
      }
    ],
    datasets: {
      'nodes': options.nodes as any[]
    }
  };
}
