import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { LabelComponent } from './label.component';

export class LabelVisualization extends DefaultVisualization {
  readonly component = LabelComponent;
}

export class LabelVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'label';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new LabelVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
