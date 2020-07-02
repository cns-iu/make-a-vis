import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ThicknessComponent } from './thickness.component';

export class ThicknessVisualization extends DefaultVisualization {
  readonly component = ThicknessComponent;
}

export class ThicknessVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'thickness';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new ThicknessVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
