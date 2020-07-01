import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';
import { GeomapVisualizationFactory } from './geomap.visualization';

export class GeomapPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new GeomapVisualizationFactory());
  }
}
