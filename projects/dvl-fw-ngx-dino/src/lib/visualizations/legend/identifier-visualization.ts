import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { IdentifierComponent } from '../../components/legend/identifier/identifier.component';

export class IdentifierVisualization extends DefaultVisualization {
  readonly component = IdentifierComponent;
}

export class IdentifierVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'id';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new IdentifierVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
