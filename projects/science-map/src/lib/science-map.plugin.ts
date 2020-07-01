import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';
import { ScienceMapVisualizationFactory } from './science-map.visualization';

export class ScienceMapPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScienceMapVisualizationFactory());
  }
}
