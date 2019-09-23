import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { YAxisComponent } from '../../components/legend/y-axis/y-axis.component';

export class YAxisVisualization extends DefaultVisualization {
  readonly component = YAxisComponent;
}

export class YAxisVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'y-axis';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new YAxisVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
