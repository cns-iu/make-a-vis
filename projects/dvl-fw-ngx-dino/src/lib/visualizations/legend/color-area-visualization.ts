import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ColorAreaComponent } from '../../components/legend/color-area/color-area.component';

export class ColorAreaVisualization extends DefaultVisualization {
  readonly component = ColorAreaComponent;
}

export class ColorAreaVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'color-area';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new ColorAreaVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
