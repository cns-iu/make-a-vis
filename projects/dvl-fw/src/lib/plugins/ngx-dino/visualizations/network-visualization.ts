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
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        // { type: 'position', label: 'Position' },
        { id: 'x', type: 'axis', label: 'X', visualization: 'x-axis' },
        { id: 'y', type: 'axis', label: 'Y', visualization: 'y-axis' },
        { type: 'color', label: 'Color Hue', visualization: 'color',  staticVisualization: 'color-area' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', staticVisualization: 'area-size' },
        // { type: 'shape', label: 'Shape' },
        // { type: 'transparency', label: 'Transparency'},
        // { type: 'strokeTransparency', label: 'Stroke Transparency'},
        { id: 'label', type: 'text', label: 'Label', visualization: 'label'},
        { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label'}
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { id: 'sourceX', type: 'axis', label: 'Source X', visualization: 'source' },
        { id: 'sourceY', type: 'axis', label: 'Source Y', visualization: 'source' },
        { id: 'targetX', type: 'axis', label: 'Target X', visualization: 'target' },
        { id: 'targetY', type: 'axis', label: 'Target Y', visualization: 'target' },
        // { type: 'source', label: 'Source Position' },
        // { type: 'target', label: 'Target Position' },
        { type: 'strokeColor', label: 'Color Hue', visualization: 'color', staticVisualization: 'color-area' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size',  staticVisualization: 'thickness'  },
        // { type: 'transparency', label: 'Transparency' }
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
