// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { Project } from '../../../../shared/project';
import { Visualization } from '../../../../shared/visualization';
import { DefaultVisualization } from '../../../default/default-visualization';
import { YAxisComponent } from '../../components/legend/y-axis/y-axis.component';

export class YAxisVisualization extends DefaultVisualization {
  readonly component = YAxisComponent;
}

export class YAxisVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'y-axis';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new YAxisVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
