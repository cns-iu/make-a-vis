import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { SciencemapComponent } from './../components/sciencemap/sciencemap.component';

export class SciencemapVisualization extends DefaultVisualization {
  readonly component = SciencemapComponent;
  readonly graphicSymbolOptions = [{
    id: 'subdisciplinePoints', label: 'Subdiscipline Points', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier' },
      { type: 'areaSize', label: 'Area Size' }
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
