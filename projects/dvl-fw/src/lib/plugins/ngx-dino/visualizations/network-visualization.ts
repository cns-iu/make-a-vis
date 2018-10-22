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
        { type: 'identifier', label: 'Identifier' },
        { type: 'position', label: 'Position' },
        { type: 'areaSize', label: 'Area Size', visualization: 'node-size'},
        { type: 'shape', label: 'Shape' },
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' }
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'source', label: 'Source Position' },
        { type: 'target', label: 'Target Position' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size' }
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
