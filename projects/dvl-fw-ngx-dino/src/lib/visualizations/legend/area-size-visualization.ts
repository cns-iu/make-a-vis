import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { AreaSizeComponent } from '../../components/legend/area-size/area-size.component';

export class AreaSizeVisualization extends DefaultVisualization {
  readonly component = AreaSizeComponent;
}

export class AreaSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'area-size';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new AreaSizeVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
