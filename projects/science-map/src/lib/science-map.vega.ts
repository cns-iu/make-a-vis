import { VisualizationSpec } from 'vega-embed';

import { VisualizationNode } from './interfaces';
import { scienceMapData } from './science-map.data';


export interface ScienceMapSpecOptions {
  nodes?: VisualizationNode[];
}

export function scienceMapSpec(options: ScienceMapSpecOptions = {}): VisualizationSpec {
  const xAxis = {minExtent: 90, maxExtent: 515, grid: false, ticks: false, labels: false, domain: false, title: null};
  const yAxis = {minExtent: 0, maxExtent: 275, grid: false, ticks: false, labels: false, domain: false, title: null};
  const xScale = {domain: [xAxis.minExtent, xAxis.maxExtent]};
  const yScale = {domain: [yAxis.minExtent, yAxis.maxExtent]};

  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'The UCSD Map of Science visualization depicts a network of 554 subdiscipline nodes that are aggregated into 13 main disciplines of science. Each discipline has a distinct color and is labeled. Record sets (e.g., journal papers) are represented by circles centered at specific subdisciplines--matched based on journal names. The “Unclassified” and “Multidisciplinary” circles in the lower left represent all records that could not be matched and all records that were published in multidisciplinary journals such as Science, Nature, etc., respectively. Circle area is proportional to the number of papers, and the minimum and maximum values are given in the legend. Circle tooltips reveal the names of subdiscipline nodes.',
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
      // Draw subdiscipline <-> subdiscipline edges
      {
        mark: { type: 'rule', color: '#9b9b9b', strokeOpacity: 0.25 },
        data: { name: 'edges', values: scienceMapData.edges },
        transform: [
          {
            lookup: 'subd_id1',
            from: {
              data: {
                values: scienceMapData.nodes
              },
              key: 'subd_id',
              fields: ['x', 'y', 'weight']
            }
          },
          {
            lookup: 'subd_id2',
            from: {
              data: {
                values: scienceMapData.nodes
              },
              key: 'subd_id',
              fields: ['x', 'y']
            },
            as: ['x2', 'y2']
          }
        ],
        encoding: {
          x: {field: 'x', type: 'quantitative', scale: xScale, axis: xAxis},
          y: {field: 'y', type: 'quantitative', scale: yScale, axis: yAxis},
          x2: {field: 'x2', type: 'quantitative'},
          y2: {field: 'y2', type: 'quantitative'},
          strokeWidth: {field: 'weight', type: 'quantitative', scale: null}
        }
      },

      // Draw subdiscipline as nodes
      {
        mark: 'point',
        data: {name: 'nodes', values: options.nodes as any[] || undefined},
        transform: [
          {
            lookup: '__ngx-dino-datum-id__',
            from: {
              data: {
                values: scienceMapData.nodes
              },
              key: 'subd_id',
              fields: ['x', 'y', 'subd_id', 'subd_name', 'disc_id']
            }
          },
          {
            lookup: 'disc_id',
            from: {
              data: {
                values: scienceMapData.disciplines
              },
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
          x: {field: 'x', type: 'quantitative', scale: xScale, axis: xAxis},
          y: {field: 'y', type: 'quantitative', scale: yScale, axis: yAxis},
          shape: {field: 'shape', type: 'nominal', scale: null},
          fill: {field: 'color', type: 'nominal', scale: null},
          fillOpacity: {field: 'opacity', type: 'quantitative', scale: null},
          stroke: {field: 'strokeColor', type: 'nominal', scale: null},
          strokeWidth: {field: 'strokeWidth', type: 'quantitative', scale: null},
          strokeOpacity: {field: 'strokeOpacity', type: 'quantitative', scale: null},
          size: {field: 'areaSize', type: 'quantitative', scale: null},
          tooltip: {field: 'tooltip', type: 'nominal'}
        }
      },

      // Draw Discipline Labels
      {
        mark: {
          type: 'text', fontSize: 17, fillOpacity: 0.75, strokeOpacity: 0.9,
          stroke: '#000007', strokeWidth: 1, align: 'left', baseline: 'middle'
        },
        data: { name: 'labels', values: scienceMapData.labels },
        encoding: {
          x: {field: 'x', type: 'quantitative', scale: xScale, axis: xAxis},
          y: {field: 'y', type: 'quantitative', scale: yScale, axis: yAxis},
          color: {field: 'color', type: 'nominal', scale: null},
          text: {field: 'disc_name', type: 'nominal'}
        }
      }
    ]
  };
}