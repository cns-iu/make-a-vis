import { VisualizationSpec } from 'vega-embed';
import type { Align, TextBaseline } from 'vega';

import { VisualizationNode } from './interfaces';
import { scienceMapData } from './science-map.data';


export interface ScienceMapSpecOptions {
  nodes?: VisualizationNode[];
  enableTooltip?: boolean;
  enableZoomPan?: boolean;
  subdisciplineColor?: string;
  subdisciplineStrokeOpacity?: number;
  labelStrokeOpacity?: number;
  labelFillOpacity?: number;
  labelFontSize?: number;
  labelStroke?: string;
  labelStrokeWidth?: number;
  labelAlign?: Align;
  labelBaseline?: TextBaseline;
  xScale?: number[];
  yScale?: number[];
}

export function scienceMapSpec(options: ScienceMapSpecOptions = {}): VisualizationSpec {
  // Apply default styling options
  options = {
    ...{
      enableTooltip: true,
      subdisciplineColor: '#9b9b9b',
      subdisciplineStrokeOpacity: 0.25,
      labelStrokeOpacity: 0.9,
      labelFillOpacity: 0.75,
      labelFontSize: 17,
      labelStroke: '#000007',
      labelStrokeWidth: 1,
      labelAlign: 'left',
      labelBaseline: 'middle',
      xScale: [100, 500],
      yScale: [0, 275]
    },
    ...options
  };

  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'The UCSD Map of Science visualization depicts a network of 554 subdiscipline nodes that are aggregated into 13 main disciplines of science. Each discipline has a distinct color and is labeled. Record sets (e.g., journal papers) are represented by circles centered at specific subdisciplines--matched based on journal names. The “Unclassified” and “Multidisciplinary” circles in the lower left represent all records that could not be matched and all records that were published in multidisciplinary journals such as Science, Nature, etc., respectively. Circle area is proportional to the number of papers, and the minimum and maximum values are given in the legend. Circle tooltips reveal the names of subdiscipline nodes.',
    autosize: {type: 'fit', resize: true, contains: 'padding'},
    padding: 8,
    width: 'container',
    height: 'container',
    config: {view: {strokeOpacity: 0}},
    layer: [
      // Draw subdiscipline <-> subdiscipline edges
      {
        mark: {type: 'rule', color: options.subdisciplineColor, strokeOpacity: options.subdisciplineStrokeOpacity},
        data: {name: 'subdisciplineEdges'},
        params: options.enableZoomPan ? [
          {
            name: 'grid',
            select: 'interval',
            bind: 'scales'
          }
        ] : [],
        transform: [
          {
            lookup: 'subd_id1',
            from: {
              data: {name: 'subdisciplines'},
              key: 'subd_id',
              fields: ['x', 'y', 'weight']
            }
          },
          {
            lookup: 'subd_id2',
            from: {
              data: {name: 'subdisciplines'},
              key: 'subd_id',
              fields: ['x', 'y']
            },
            as: ['x2', 'y2']
          }
        ],
        encoding: {
          x: {field: 'x', type: 'quantitative', scale: {domain: options.xScale}, axis: null},
          y: {field: 'y', type: 'quantitative', scale: {domain: options.yScale}, axis: null},
          x2: {field: 'x2', type: 'quantitative'},
          y2: {field: 'y2', type: 'quantitative'},
          strokeWidth: {field: 'weight', type: 'quantitative', scale: null}
        }
      },

      // Draw subdiscipline as nodes
      {
        mark: 'point',
        data: {name: 'nodes'},
        transform: [
          {
            lookup: '__ngx-dino-datum-id__',
            from: {
              data: {name: 'subdisciplines'},
              key: 'subd_id',
              fields: ['x', 'y', 'subd_id', 'subd_name', 'disc_id']
            }
          },
          {
            lookup: 'disc_id',
            from: {
              data: {name: 'disciplines'},
              key: 'disc_id',
              fields: ['disc_name', 'color']
            },
            as: ['disc_name', 'disc_color']
          },
          {
            calculate: '!isValid(datum.tooltip) || datum.subd_id === datum.tooltip ? datum.subd_name : datum.tooltip',
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
          x: {field: 'x', type: 'quantitative', scale: {domain: options.xScale}, axis: null},
          y: {field: 'y', type: 'quantitative', scale: {domain: options.yScale}, axis: null},
          shape: {field: 'shape', type: 'nominal', scale: null},
          fill: {field: 'color', type: 'nominal', scale: null},
          fillOpacity: {field: 'opacity', type: 'quantitative', scale: null},
          stroke: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          strokeOpacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          size: {field: 'areaSize', type: 'quantitative', scale: null},
          tooltip: options.enableTooltip !== false ? {field: 'tooltip', type: 'nominal'} : undefined
        }
      },

      // Draw Discipline Labels
      {
        mark: {
          type: 'text', fontSize: options.labelFontSize, fillOpacity: options.labelFillOpacity, strokeOpacity: options.labelStrokeOpacity,
          stroke: options.labelStroke, strokeWidth: options.labelStrokeWidth, align: options.labelAlign, baseline: options.labelBaseline
        },
        data: {name: 'disciplineLabels'},
        encoding: {
          x: {field: 'x', type: 'quantitative', scale: {domain: options.xScale}, axis: null},
          y: {field: 'y', type: 'quantitative', scale: {domain: options.yScale}, axis: null},
          color: {field: 'color', type: 'nominal', scale: null},
          text: {field: 'disc_name', type: 'nominal'}
        }
      }
    ],
    datasets: {
      nodes: options.nodes as any[] || undefined,
      disciplines: scienceMapData.disciplines,
      disciplineLabels: scienceMapData.labels,
      subdisciplines: scienceMapData.nodes,
      subdisciplineEdges: scienceMapData.edges,
    }
  };
}
