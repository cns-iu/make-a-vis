import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { TargetComponent } from '../../components/legend/target/target.component';

export class TargetVisualization extends DefaultVisualization {
  readonly component = TargetComponent;
}

export class TargetVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'target';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new TargetVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
