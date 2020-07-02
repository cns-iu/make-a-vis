import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';
import { ScatterplotVisualizationFactory } from './scatterplot.visualization';

export class ScatterplotPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScatterplotVisualizationFactory());
  }
}
