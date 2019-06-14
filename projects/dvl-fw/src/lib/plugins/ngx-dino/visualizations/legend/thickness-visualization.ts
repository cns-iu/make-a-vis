// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { Project } from '../../../../shared/project';
import { Visualization } from '../../../../shared/visualization';
import { DefaultVisualization } from '../../../default/default-visualization';
import { ThicknessComponent } from '../../components/legend/thickness/thickness.component';

export class ThicknessVisualization extends DefaultVisualization {
  readonly component = ThicknessComponent;
}

export class ThicknessVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'thickness';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ThicknessVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
