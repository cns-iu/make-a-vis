// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ShapeComponent } from '../components/static-legend/shape/shape.component';

export class ShapeVisualization extends DefaultVisualization {
  readonly component = ShapeComponent;
}

export class ShapeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'shape';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ShapeVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
