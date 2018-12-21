// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { IdentifierComponent } from '../components/static-legend/identifier/identifier.component';

export class IdentifierVisualization extends DefaultVisualization {
  readonly component = IdentifierComponent;
}

export class IdentifierVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'id';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new IdentifierVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
