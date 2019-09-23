import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ColorEdgesComponent } from '../../components/legend/color-edges/color-edges.component';

export class ColorEdgesVisualization extends DefaultVisualization {
  readonly component = ColorEdgesComponent;
}

export class ColorEdgesVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'color-edges';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new ColorEdgesVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
