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
        { type: 'color', label: 'Color Hue', visualization: 'gradient' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        // { type: 'transparency', label: 'Transparency' },
        // { type: 'strokeTransparency', label: 'Stroke Transparency' }
      ]
    },
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { type: 'latitude', label: 'Latitude', visualization: 'x-axis' },
        { type: 'longitude', label: 'Longitude', visualization: 'y-axis' },
        { type: 'color', label: 'Color Hue', visualization: 'gradient', staticVisualization: 'color-area' },
        // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', staticVisualization: 'area-size'},
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
        { type: 'latitude1', label: 'Source Latitude', visualization: 'source' },
        { type: 'longitude1', label: 'Source Longitude', visualization: 'source' },
        { type: 'latitude2', label: 'Target Latitude', visualization: 'target' },
        { type: 'longitude2', label: 'Target Longitude', visualization: 'target' },
        { type: 'strokeColor', label: 'Color Hue', visualization: 'color', staticVisualization: 'color-edges' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size', staticVisualization: 'thickness'  },
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
