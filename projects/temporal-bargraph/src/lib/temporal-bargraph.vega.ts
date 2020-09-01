import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';


export interface TemporalBargraphSpecOptions {
  nodes?: VisualizationNode[];
  enableZoomPan?: boolean;
  hasYOrder?: boolean;
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
        calculate: `'' + datum['${ options.hasYOrder ? 'y-order' : 'x-start' }'] + '-' + datum.identifier`,
        as: 'order'
      },
      {
        calculate: `!isValid(datum.label) ? '' : datum.label`,
        as: 'label'
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
      {
        stack: 'areaSize',
        groupby: [],
        sort: [{
          field: 'order'
        }],
        as: ['y-start', 'y-end']
      },
      {
        calculate: `(datum['y-start'] + datum['y-end']) / 2`,
        as: 'y-mid'
      }
    ],

    encoding: {
      x: {
        field: 'x-start',
        type: 'ordinal',
        axis: {
          title: null,
          domain: false,
          ticks: false,
          tickBand: 'center',
          labelAlign: 'right',
          labelAngle: 0,
          grid: true,
        }
      }
    },

    layer: [
      // Bars
      {
        mark: 'bar',
        encoding: {
          x2: {
            field: 'x-end'
          },
          y: {
            field: 'y-start',
            type: 'quantitative',
            sort: '-x',
            axis: null
          },
          y2: {
            field: 'y-end'
          },
          fill: {
            field: 'color',
            type: 'nominal',
            scale: null
          },
          fillOpacity: {
            field: 'opacity',
            type: 'quantitative',
            scale: null
          },
          stroke: {
            value: 'white'
          },
          strokeWidth: {
            value: 0.5
          },
          size: {
            field: 'areaSize',
            type: 'quantitative',
            legend: null
          },
          tooltip: {
            field: 'tooltip',
            type: 'nominal'
          }
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
          y: {
            field: 'y-mid',
            type: 'quantitative'
          },
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
