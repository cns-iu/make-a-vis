import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { GeomapComponent } from './../components/geomap/geomap.component';

export class GeomapVisualization extends DefaultVisualization {
  readonly component = GeomapComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'states', label: 'States', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'color', label: 'Color' }
      ]
    }, {
      id: 'points', label: 'Points', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'latlng', label: 'Latitude/Longitude' },
        { type: 'areaSize', label: 'Area Size' },
        { type: 'shape', label: 'Shape' },
        { type: 'color', label: 'Color' },
        { type: 'strokeColor', label: 'strokeColor' }
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
