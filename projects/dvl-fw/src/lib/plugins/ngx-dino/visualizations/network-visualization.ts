// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { NetworkComponent } from '../components/network/network.component';

export class NetworkVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly description = 'This network visualization presents nodes connected by links. ForceAtlas2, a force-directed layout algorithm, is used to position nodes in two-dimensional space. The algorithm aims to minimize edge crossings and to place nodes so that all edges are of more or less equal length. Nodes can be size and color coded, and edges can be thickness and color coded. An additional data variable can be presented through tooltips on the nodes.';
  readonly component = NetworkComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        // { type: 'position', label: 'Position' },
        { id: 'x', type: 'axis', label: 'X', visualization: 'x-axis', scaleType: 'ratio', required: true },
        { id: 'y', type: 'axis', label: 'Y', visualization: 'y-axis', scaleType: 'ratio', required: true },
        { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', staticVisualization: 'area-size',
          required: true
        },
        // { type: 'shape', label: 'Shape' },
        // { type: 'transparency', label: 'Transparency'},
        // { type: 'strokeTransparency', label: 'Stroke Transparency'},
        { id: 'label', type: 'text', label: 'Label', visualization: 'label'},
        { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label'}
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { id: 'sourceX', type: 'axis', label: 'Source X', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'sourceY', type: 'axis', label: 'Source Y', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'targetX', type: 'axis', label: 'Target X', visualization: 'target', scaleType: 'ratio', required: true },
        { id: 'targetY', type: 'axis', label: 'Target Y', visualization: 'target', scaleType: 'ratio', required: true },
        // { type: 'source', label: 'Source Position' },
        // { type: 'target', label: 'Target Position' },
        { type: 'strokeColor', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', staticVisualization: 'thickness',
          required: true
        },
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
