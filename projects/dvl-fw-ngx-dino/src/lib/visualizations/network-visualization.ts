import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { NetworkComponent } from '../components/network/network.component';

export class NetworkVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly defaultDescription = 'This network visualization presents nodes connected by links. ForceAtlas2, a force-directed layout algorithm, is used to position nodes in two-dimensional space. The algorithm aims to minimize edge crossings and to place nodes so that all edges are of more or less equal length. Nodes can be size and color coded, and edges can be thickness and color coded. An additional data variable can be presented through tooltips on the nodes.';
  readonly component = NetworkComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { id: 'x', type: 'axis', label: 'X', visualization: 'x-axis', scaleType: 'ratio', required: true },
        { id: 'y', type: 'axis', label: 'Y', visualization: 'y-axis', scaleType: 'ratio', required: true },
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { type: 'position', label: 'Position', advanced: true },
        { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        { id: 'strokeColor', type: 'color', label: 'Stroke Color Hue', visualization: 'color', advanced: true },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size', staticVisualization: 'thickness', advanced: true },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', staticVisualization: 'area-size',
          required: true
        },
        { type: 'transparency', label: 'Transparency', advanced: true},
        { id: 'strokeTransparency', type: 'transparency', label: 'Stroke Transparency', advanced: true},
        { id: 'label', type: 'text', label: 'Label', visualization: 'label'},
        { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label'},
        { type: 'labelPosition', label: 'Label Position', advanced: true },
        { type: 'shape', label: 'Shape', advanced: true },
        { type: 'pulse', label: 'Pulse', advanced: true },
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { id: 'sourceX', type: 'axis', label: 'Source X', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'sourceY', type: 'axis', label: 'Source Y', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'targetX', type: 'axis', label: 'Target X', visualization: 'target', scaleType: 'ratio', required: true },
        { id: 'targetY', type: 'axis', label: 'Target Y', visualization: 'target', scaleType: 'ratio', required: true },
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { type: 'source', label: 'Source Position', advanced: true },
        { type: 'target', label: 'Target Position', advanced: true },
        { id: 'strokeColor', type: 'color', label: 'Color Hue', visualization: 'color', staticVisualization: 'color-area' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', required: true,
          staticVisualization: 'thickness'
        },
        { type: 'transparency', label: 'Transparency', advanced: true }
      ]
    }
  ];
}

export class NetworkVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'network';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new NetworkVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
