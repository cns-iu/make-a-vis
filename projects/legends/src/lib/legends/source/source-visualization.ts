import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { SourceComponent } from './source.component';

export class SourceVisualization extends DefaultVisualization {
  readonly component = SourceComponent;
}

export class SourceVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'source';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new SourceVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
