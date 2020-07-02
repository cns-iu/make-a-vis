import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';

import {
  AreaSizeVisualizationFactory, ColorAreaVisualizationFactory, ColorEdgesVisualizationFactory,
  ColorVisualizationFactory, EdgeSizeVisualizationFactory, EndVisualizationFactory,
  GradientVisualizationFactory, IdentifierVisualizationFactory, LabelVisualizationFactory,
  NodeSizeVisualizationFactory, ShapeVisualizationFactory, SourceVisualizationFactory,
  StartVisualizationFactory, TargetVisualizationFactory, ThicknessVisualizationFactory,
  XAxisVisualizationFactory, YAxisVisualizationFactory,
} from './legends';

export class LegendsPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new NodeSizeVisualizationFactory());
    registry.registerObjectFactory(new EdgeSizeVisualizationFactory());
    registry.registerObjectFactory(new ColorVisualizationFactory());
    registry.registerObjectFactory(new YAxisVisualizationFactory());
    registry.registerObjectFactory(new XAxisVisualizationFactory());
    registry.registerObjectFactory(new IdentifierVisualizationFactory());
    registry.registerObjectFactory(new StartVisualizationFactory());
    registry.registerObjectFactory(new EndVisualizationFactory());
    registry.registerObjectFactory(new LabelVisualizationFactory());
    registry.registerObjectFactory(new ThicknessVisualizationFactory());
    registry.registerObjectFactory(new ShapeVisualizationFactory());
    registry.registerObjectFactory(new ColorAreaVisualizationFactory());
    registry.registerObjectFactory(new AreaSizeVisualizationFactory());
    registry.registerObjectFactory(new GradientVisualizationFactory());
    registry.registerObjectFactory(new ColorEdgesVisualizationFactory());
    registry.registerObjectFactory(new SourceVisualizationFactory());
    registry.registerObjectFactory(new TargetVisualizationFactory());
  }
}
