import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { EdgeSizeComponent } from './edge-size.component';

export class EdgeSizeVisualization extends DefaultVisualization {
  readonly component = EdgeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size' }
      ]
    }
  ];
}

export class EdgeSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'edge-size';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new EdgeSizeVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
