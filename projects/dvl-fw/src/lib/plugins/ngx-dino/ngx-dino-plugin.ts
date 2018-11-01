// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ColorVisualizationFactory } from './visualizations/color-visualization';
import { EdgeSizeVisualizationFactory } from './visualizations/edge-size-visualization';
import { GeomapVisualizationFactory } from './visualizations/geomap-visualization';
import { NetworkVisualizationFactory } from './visualizations/network-visualization';
import { NodeSizeVisualizationFactory } from './visualizations/node-size-visualization';
import { ScatterplotVisualizationFactory } from './visualizations/scatterplot-visualization';
import { SciencemapVisualizationFactory } from './visualizations/sciencemap-visualization';
import { TemporalBargraphVisualizationFactory } from './visualizations/temporal-bargraph-visualization';


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
  }
}
