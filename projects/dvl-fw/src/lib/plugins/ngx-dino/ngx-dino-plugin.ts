import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ScatterplotVisualizationFactory } from './components/scatterplot/scatterplot-visualization';
import { GeomapVisualizationFactory } from './components/geomap/geomap-visualization';
import { NetworkVisualizationFactory } from './components/network/network-visualization';
import { SciencemapVisualizationFactory } from './components/sciencemap/sciencemap-visualization';
import { TemporalBargraphVisualizationFactory } from './components/temporal-bargraph/temporal-bargraph-visualization';


export class NgxDinoPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScatterplotVisualizationFactory());
    registry.registerObjectFactory(new GeomapVisualizationFactory());
    registry.registerObjectFactory(new NetworkVisualizationFactory());
    registry.registerObjectFactory(new SciencemapVisualizationFactory());
    registry.registerObjectFactory(new TemporalBargraphVisualizationFactory());
  }
}
