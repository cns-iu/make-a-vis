// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { EndComponent } from '../components/static-legend/end/end.component';

export class EndVisualization extends DefaultVisualization {
  readonly component = EndComponent;
}

export class EndVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'end';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new EndVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
