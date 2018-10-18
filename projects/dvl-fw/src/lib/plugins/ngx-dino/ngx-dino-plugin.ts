import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ScatterplotVisualizationFactory } from './visualizations/scatterplot-visualization';
import { GeomapVisualizationFactory } from './visualizations/geomap-visualization';
import { NetworkVisualizationFactory } from './visualizations/network-visualization';
import { SciencemapVisualizationFactory } from './visualizations/sciencemap-visualization';
import { TemporalBargraphVisualizationFactory } from './visualizations/temporal-bargraph-visualization';


export class NgxDinoPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScatterplotVisualizationFactory());
    registry.registerObjectFactory(new GeomapVisualizationFactory());
    registry.registerObjectFactory(new NetworkVisualizationFactory());
    registry.registerObjectFactory(new SciencemapVisualizationFactory());
    registry.registerObjectFactory(new TemporalBargraphVisualizationFactory());
  }
}
