import { VisualizationSpec } from 'vega-embed';


export function scienceMapSpec(options = {}): VisualizationSpec {
  return {
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'The UCSD Map of Science visualization depicts a network of 554 subdiscipline nodes that are aggregated into 13 main disciplines of science. Each discipline has a distinct color and is labeled. Record sets (e.g., journal papers) are represented by circles centered at specific subdisciplines--matched based on journal names. The “Unclassified” and “Multidisciplinary” circles in the lower left represent all records that could not be matched and all records that were published in multidisciplinary journals such as Science, Nature, etc., respectively. Circle area is proportional to the number of papers, and the minimum and maximum values are given in the legend. Circle tooltips reveal the names of subdiscipline nodes.',
    data: { name: 'nodes' },
    autosize: {
      type: 'fit',
      resize: true,
      contains: 'padding'
    },
    padding: 16,
    width: 'container',
    height: 'container',
    mark: 'point',
    encoding: {
      x: {field: 'areaSize', type: 'quantitative'},
      y: {field: 'areaSize', type: 'quantitative'},
      shape: {field: 'shape', type: 'nominal'},
      color: {field: 'color', type: 'nominal'},
      size: {field: 'areaSize', type: 'ordinal'}
    }
  };
}
