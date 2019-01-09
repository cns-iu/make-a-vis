// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { GeomapComponent } from '../components/geomap/geomap.component';

export class GeomapVisualization extends DefaultVisualization {
  readonly description = 'TODO';
  readonly component = GeomapComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'basemap', label: 'Basemap', type: 'area',
      graphicVariableOptions: [
        { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        // { type: 'transparency', label: 'Transparency' },
        // { type: 'strokeTransparency', label: 'Stroke Transparency' }
      ]
    },
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { type: 'latitude', label: 'Latitude', visualization: 'x-axis', scaleType: 'ratio', required: true },
        { type: 'longitude', label: 'Longitude', visualization: 'y-axis', scaleType: 'ratio', required: true },
        { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', required: true,
          staticVisualization: 'area-size'
        },
        // { type: 'shape', label: 'Shape' },
        // { type: 'transparency', label: 'Transparency'},
        // { type: 'strokeTransparency', label: 'Stroke Transparency'},
        { id: 'label', type: 'text', label: 'Label', visualization: 'label', scaleType: 'nominal' },
        { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' }
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { id: 'latitude1', type: 'latitude', label: 'Source Latitude', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'longitude1', type: 'longitude', label: 'Source Longitude', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'latitude2', type: 'latitude', label: 'Target Latitude', visualization: 'target', scaleType: 'ratio', required: true },
        { id: 'longitude2', type: 'longitude', label: 'Target Longitude', visualization: 'target', scaleType: 'ratio', required: true },
        { type: 'strokeColor', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-edges' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', required: true,
          staticVisualization: 'thickness'
        },
        // { type: 'transparency', label: 'Transparency' }
      ]
    }
  ];
}

export class GeomapVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'geomap';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new GeomapVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
