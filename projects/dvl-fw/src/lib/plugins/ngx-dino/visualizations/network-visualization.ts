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
        { type: 'areaSize', label: 'Area Size' },
        { type: 'shape', label: 'Shape' },
        { type: 'color', label: 'Color' },
        { type: 'strokeColor', label: 'strokeColor' }
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'source', label: 'Source Position' },
        { type: 'target', label: 'Target Position' },
        { type: 'strokeColor', label: 'Stroke Color' },
        { type: 'strokeWidth', label: 'Stroke Width' }
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
