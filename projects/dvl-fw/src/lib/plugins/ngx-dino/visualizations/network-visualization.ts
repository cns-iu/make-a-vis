// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { NetworkComponent } from '../components/network/network.component';

export class NetworkVisualization extends DefaultVisualization {
  readonly description = 'TODO';
  readonly component = NetworkComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'position', label: 'Position' },
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'areaSize', label: 'Area Size', visualization: 'node-size'},
        { type: 'shape', label: 'Shape' },
        { type: 'transparency', label: 'Transparency'},
        { type: 'strokeTransparency', label: 'Stroke Transparency'},
        { type: 'label', label: 'Label'},
        { type: 'tooltip', label: 'Tooltip'}
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'source', label: 'Source Position' },
        { type: 'target', label: 'Target Position' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size' },
        { type: 'transparency', label: 'Transparency' }
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
