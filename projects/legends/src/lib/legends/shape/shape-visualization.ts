import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ShapeComponent } from './shape.component';

export class ShapeVisualization extends DefaultVisualization {
  readonly component = ShapeComponent;
}

export class ShapeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'shape';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new ShapeVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
