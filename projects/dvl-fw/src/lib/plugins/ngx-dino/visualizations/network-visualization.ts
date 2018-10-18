import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { NetworkComponent } from './../components/network/network.component';

export class NetworkVisualization extends DefaultVisualization {
  readonly component = NetworkComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'none' },
        { type: 'position', label: 'Position', visualization: 'none' },
        { type: 'areaSize', label: 'Area Size', visualization: 'nodeSize'},
        { type: 'shape', label: 'Shape', visualization: 'nodeSize' },
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'strokeColor', label: 'strokeColor', visualization: 'color' }
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'none' },
        { type: 'source', label: 'Source Position', visualization: 'none' },
        { type: 'target', label: 'Target Position', visualization: 'none' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edgeSize' }
      ]
    }
  ];
}

export class NetworkVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'network';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new NetworkVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
