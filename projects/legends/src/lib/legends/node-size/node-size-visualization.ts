import { ObjectFactory, ObjectFactoryRegistry, DefaultVisualization, Visualization, Project } from '@dvl-fw/core';

import { NodeSizeComponent } from './node-size.component';

export class NodeSizeVisualization extends DefaultVisualization {
  readonly component = NodeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size'}
      ]
    }
  ];
}

export class NodeSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'node-size';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new NodeSizeVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
