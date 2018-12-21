// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { AreaSizeComponent } from '../components/static-legend/area-size/area-size.component';

export class AreaSizeVisualization extends DefaultVisualization {
  readonly component = AreaSizeComponent;
}

export class AreaSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'area-size';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new AreaSizeVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
