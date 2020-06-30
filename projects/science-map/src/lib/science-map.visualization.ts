import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ScienceMapComponent } from './science-map.component';


export class ScienceMapVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly defaultDescription = 'The UCSD Map of Science visualization depicts a network of 554 subdiscipline nodes that are aggregated into 13 main disciplines of science. Each discipline has a distinct color and is labeled. Record sets (e.g., journal papers) are represented by circles centered at specific subdisciplines--matched based on journal names. The “Unclassified” and “Multidisciplinary” circles in the lower left represent all records that could not be matched and all records that were published in multidisciplinary journals such as Science, Nature, etc., respectively. Circle area is proportional to the number of papers, and the minimum and maximum values are given in the legend. Circle tooltips reveal the names of subdiscipline nodes.';
  readonly component = ScienceMapComponent;
  readonly graphicSymbolOptions = [{
    id: 'subdisciplinePoints', label: 'Subdiscipline Points', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
      { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
      { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', staticVisualization: 'area-size' },
      { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' }
    ]
  }];
}

export class ScienceMapVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'science-map';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new ScienceMapVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
