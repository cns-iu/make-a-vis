// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { XAxisComponent } from '../components/static-legend/x-axis/x-axis.component';

export class XAxisVisualization extends DefaultVisualization {
  readonly component = XAxisComponent;
}

export class XAxisVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'x-axis';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new XAxisVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
