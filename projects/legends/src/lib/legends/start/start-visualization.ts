import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { StartComponent } from './start.component';

export class StartVisualization extends DefaultVisualization {
  readonly component = StartComponent;
}

export class StartVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'start';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new StartVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
