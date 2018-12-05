// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { SciencemapComponent } from '../components/sciencemap/sciencemap.component';

export class SciencemapVisualization extends DefaultVisualization {
  readonly description = 'TODO';
  readonly component = SciencemapComponent;
  readonly graphicSymbolOptions = [{
    id: 'subdisciplinePoints', label: 'Subdiscipline Points', type: 'area',
    graphicVariableOptions: [
      { type: 'areaSize', label: 'Area Size', visualization: 'node-size' },
      { type: 'identifier', label: 'Identifier' }
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
