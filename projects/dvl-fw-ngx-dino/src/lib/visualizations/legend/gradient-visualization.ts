import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { GradientComponent } from '../../components/legend/gradient/gradient.component';

export class GradientVisualization extends DefaultVisualization {
  readonly component = GradientComponent;
}

export class GradientVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'gradient';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new GradientVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
