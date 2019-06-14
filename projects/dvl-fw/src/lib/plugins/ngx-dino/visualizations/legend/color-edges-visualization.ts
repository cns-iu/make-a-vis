// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { Project } from '../../../../shared/project';
import { Visualization } from '../../../../shared/visualization';
import { DefaultVisualization } from '../../../default/default-visualization';
import { ColorEdgesComponent } from '../../components/legend/color-edges/color-edges.component';

export class ColorEdgesVisualization extends DefaultVisualization {
  readonly component = ColorEdgesComponent;
}

export class ColorEdgesVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'color-edges';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ColorEdgesVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
