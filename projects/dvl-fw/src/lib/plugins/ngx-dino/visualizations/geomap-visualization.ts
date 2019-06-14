// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { GeomapComponent } from '../components/geomap/geomap.component';

export class GeomapVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly defaultDescription = 'US Map: This proportional symbol map shows 50 US states and other jurisdictions using the Albers equal-area conic projection (Alaska and Hawaii are inset). Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.<br><br>World Map: This proportional symbol map shows 252 countries of the world using the equal-area Eckert IV projection. Each dataset record is represented by a circle centered at its geolocation. The area, interior color, and exterior color of each circle may represent numeric attribute values. Minimum and maximum data values are given in the legend.';
  readonly component = GeomapComponent;
  readonly graphicSymbolOptions = [
    // Disabled basemap options as they are not usable at this point, see Issue #XXX
    // {
    //   id: 'basemap', label: 'Basemap', type: 'area',
    //   graphicVariableOptions: [
    //     { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
    //     { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color', advanced: true },
    //     { type: 'transparency', label: 'Transparency', advanced: true },
    //     { id: 'strokeTransparency', type: 'transparency', label: 'Stroke Transparency', advanced: true },
    //     { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size', staticVisualization: 'thickness', advanced: true },
    //     { type: 'strokeDashArray', label: 'Stroke Dash', advanced: true },
    //   ]
    // },
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { type: 'latitude', label: 'Latitude', visualization: 'x-axis', scaleType: 'ratio', required: true },
        { type: 'longitude', label: 'Longitude', visualization: 'y-axis', scaleType: 'ratio', required: true },
        { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
        { id: 'strokeColor', type: 'color', label: 'Stroke Color Hue', visualization: 'color', advanced: true },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size', staticVisualization: 'thickness', advanced: true },
        { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', required: true,
          staticVisualization: 'area-size'
        },
        { type: 'transparency', label: 'Transparency', advanced: true},
        { id: 'strokeTransparency', type: 'transparency', label: 'Stroke Transparency', advanced: true},
        { id: 'label', type: 'text', label: 'Label', visualization: 'label', scaleType: 'nominal' },
        { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' },
        { type: 'labelPosition', label: 'Label Position', advanced: true },
        { type: 'shape', label: 'Shape', advanced: true },
        { type: 'pulse', label: 'Pulse', advanced: true },
      ]
    }, {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
        { id: 'latitude1', type: 'latitude', label: 'Source Latitude', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'longitude1', type: 'longitude', label: 'Source Longitude', visualization: 'source', scaleType: 'ratio', required: true },
        { id: 'latitude2', type: 'latitude', label: 'Target Latitude', visualization: 'target', scaleType: 'ratio', required: true },
        { id: 'longitude2', type: 'longitude', label: 'Target Longitude', visualization: 'target', scaleType: 'ratio', required: true },
        { id: 'strokeColor', type: 'color', label: 'Color Hue', visualization: 'color', staticVisualization: 'color-edges' },
        { type: 'strokeWidth', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', required: true,
          staticVisualization: 'thickness'
        },
        { type: 'transparency', label: 'Transparency', advanced: true }
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
