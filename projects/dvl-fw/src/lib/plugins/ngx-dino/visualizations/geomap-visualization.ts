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
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'transparency', label: 'Transparency' },
        { type: 'strokeTransparency', label: 'Stroke Transparency' }
      ]
    },
    {
      id: 'nodes', label: 'Nodes', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'latlng', label: 'Latitude/Longitude' },
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
        { type: 'latlng1', label: 'Source Latitude/Longitude' },
        { type: 'latlng2', label: 'Target Latitude/Longitude' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size' },
        { type: 'transparency', label: 'Transparency' }
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
