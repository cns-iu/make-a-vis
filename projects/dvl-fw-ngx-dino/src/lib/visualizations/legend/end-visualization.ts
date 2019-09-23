import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { EndComponent } from '../../components/legend/end/end.component';

export class EndVisualization extends DefaultVisualization {
  readonly component = EndComponent;
}

export class EndVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'end';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new EndVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
