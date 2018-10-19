import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { NodeSizeComponent } from './../components/node-size/node-size.component';

export class NodeSizeVisualization extends DefaultVisualization {
  readonly component = NodeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'none' },
        { type: 'position', label: 'Position', visualization: 'none' },
        { type: 'areaSize', label: 'Area Size', visualization: 'node-size'},
        { type: 'shape', label: 'Shape', visualization: 'node-size' },
      ]
    }
  ];

}

export class NodeSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'node-size';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new NodeSizeVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
