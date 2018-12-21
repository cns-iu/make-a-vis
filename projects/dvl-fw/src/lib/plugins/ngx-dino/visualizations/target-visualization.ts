// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { TargetComponent } from '../components/static-legend/target/target.component';

export class TargetVisualization extends DefaultVisualization {
  readonly component = TargetComponent;
}

export class TargetVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'target';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new TargetVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
