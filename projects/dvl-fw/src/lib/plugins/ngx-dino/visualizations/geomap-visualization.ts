// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { GeomapComponent } from '../components/geomap/geomap.component';

export class GeomapVisualization extends DefaultVisualization {
  readonly component = GeomapComponent;
  readonly graphicSymbolOptions = [
  {
      id: 'points', label: 'Points', type: 'area',
      graphicVariableOptions: [
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'areaSize', label: 'Area Size', visualization: 'node-size' },
        { type: 'transparency', label: 'Transparency' },
        { type: 'strokeTransparency', label: 'Stroke Transparency' },
        { type: 'identifier', label: 'Identifier' },
        { type: 'latlng', label: 'Latitude/Longitude' },
        { type: 'shape', label: 'Shape' }
      ]
    },
    {
      id: 'states', label: 'States', type: 'area',
      graphicVariableOptions: [
        { type: 'color', label: 'Color', visualization: 'color' },
        { type: 'identifier', label: 'Identifier' }
      ]
    },
    {
      id: 'basemap', label: 'Basemap', type: 'area',
      graphicVariableOptions: [
        { type: 'transparency', label: 'Transparency' },
        { type: 'strokeTransparency', label: 'Stroke Transparency' }
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
