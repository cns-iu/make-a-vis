// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ColorVisualizationFactory } from './visualizations/legend/color-visualization';
import { EdgeSizeVisualizationFactory } from './visualizations/legend/edge-size-visualization';
import { GeomapVisualizationFactory } from './visualizations/geomap-visualization';
import { NetworkVisualizationFactory } from './visualizations/network-visualization';
import { NodeSizeVisualizationFactory } from './visualizations/legend/node-size-visualization';
import { ScatterplotVisualizationFactory } from './visualizations/scatterplot-visualization';
import { SciencemapVisualizationFactory } from './visualizations/sciencemap-visualization';
import { TemporalBargraphVisualizationFactory } from './visualizations/temporal-bargraph-visualization';
import { YAxisVisualizationFactory } from './visualizations/legend/y-axis-visualization';
import { XAxisVisualizationFactory } from './visualizations/legend/x-axis-visualization';
import { IdentifierVisualizationFactory } from './visualizations/legend/identifier-visualization';
import { StartVisualizationFactory } from './visualizations/legend/start-visualization';
import { EndVisualizationFactory } from './visualizations/legend/end-visualization';
import { LabelVisualizationFactory } from './visualizations/legend/label-visualization';
import { ThicknessVisualizationFactory } from './visualizations/legend/thickness-visualization';
import { ShapeVisualizationFactory } from './visualizations/legend/shape-visualization';
import { ColorAreaVisualizationFactory } from './visualizations/legend/color-area-visualization';
import { AreaSizeVisualizationFactory } from './visualizations/legend/area-size-visualization';
import { GradientVisualizationFactory } from './visualizations/legend/gradient-visualization';
import { ColorEdgesVisualizationFactory } from './visualizations/legend/color-edges-visualization';
import { SourceVisualizationFactory } from './visualizations/legend/source-visualization';
import { TargetVisualizationFactory } from './visualizations/legend/target-visualization';


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
