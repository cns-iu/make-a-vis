import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';

import {
  AreaSizeVisualizationFactory, ColorAreaVisualizationFactory, ColorEdgesVisualizationFactory, ColorVisualizationFactory,
  EdgeSizeVisualizationFactory, EndVisualizationFactory, GeomapVisualizationFactory, GradientVisualizationFactory,
  IdentifierVisualizationFactory, LabelVisualizationFactory, NetworkVisualizationFactory, NodeSizeVisualizationFactory,
  ScatterplotVisualizationFactory, SciencemapVisualizationFactory, ShapeVisualizationFactory, SourceVisualizationFactory,
  StartVisualizationFactory, TargetVisualizationFactory, TemporalBargraphVisualizationFactory, ThicknessVisualizationFactory,
  XAxisVisualizationFactory, YAxisVisualizationFactory,
} from './visualizations';

export class NgxDinoPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScatterplotVisualizationFactory());
    registry.registerObjectFactory(new GeomapVisualizationFactory());
    registry.registerObjectFactory(new NetworkVisualizationFactory());
    registry.registerObjectFactory(new SciencemapVisualizationFactory());
    registry.registerObjectFactory(new TemporalBargraphVisualizationFactory());
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
