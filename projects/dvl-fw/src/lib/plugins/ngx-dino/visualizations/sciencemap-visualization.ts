// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { SciencemapComponent } from '../components/sciencemap/sciencemap.component';

export class SciencemapVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly description = 'The UCSD Map of Science visualization depicts a network of 554 subdiscipline nodes that are aggregated into 13 main disciplines of science. Each discipline has a distinct color and is labeled. Record sets (e.g., journal papers) are represented by circles centered at specific subdisciplines--matched based on journal names. The “Unclassified” and “Multidisciplinary” circles in the lower left represent all records that could not be matched and all records that were published in multidisciplinary journals such as Science, Nature, etc., respectively. Circle area is proportional to the number of papers, and the minimum and maximum values are given in the legend. Circle tooltips reveal the names of subdiscipline nodes.';
  readonly component = SciencemapComponent;
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

export class SciencemapVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'science-map';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new SciencemapVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
