import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';
import { NetworkVisualizationFactory } from './network.visualization';

export class NetworkPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new NetworkVisualizationFactory());
  }
}
