import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ScatterplotVisualizationFactory } from './scatterplot-visualization';
import { GeomapVisualizationFactory } from './geomap-visualization';
import { NetworkVisualizationFactory } from './network-visualization';
import { SciencemapVisualizationFactory } from './sciencemap-visualization';


export class NgxDinoPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ScatterplotVisualizationFactory());
    registry.registerObjectFactory(new GeomapVisualizationFactory());
    registry.registerObjectFactory(new NetworkVisualizationFactory());
    registry.registerObjectFactory(new SciencemapVisualizationFactory());
  }
}
