import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';
import { TemporalBargraphVisualizationFactory } from './temporal-bargraph.visualization';

export class TemporalBargraphPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new TemporalBargraphVisualizationFactory());
  }
}
