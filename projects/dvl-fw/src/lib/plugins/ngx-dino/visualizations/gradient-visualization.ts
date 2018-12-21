// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { GradientComponent } from '../components/static-legend/gradient/gradient.component';

export class GradientVisualization extends DefaultVisualization {
  readonly component = GradientComponent;
}

export class GradientVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'gradient';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new GradientVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
