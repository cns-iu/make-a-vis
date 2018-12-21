// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ColorAreaComponent } from '../components/static-legend/color-area/color-area.component';

export class ColorAreaVisualization extends DefaultVisualization {
  readonly component = ColorAreaComponent;
}

export class ColorAreaVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'color-area';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ColorAreaVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
