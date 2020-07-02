import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { XAxisComponent } from './x-axis.component';

export class XAxisVisualization extends DefaultVisualization {
  readonly component = XAxisComponent;
}

export class XAxisVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'x-axis';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new XAxisVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
