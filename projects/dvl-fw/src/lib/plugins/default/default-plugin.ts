import { DefaultRawDataFactory } from './default-raw-data';
import { DefaultVisualizationFactory } from './default-visualization';
import { DefaultGraphicSymbolFactory } from './default-graphic-symbol';
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from './../../shared/object-factory';

import { DefaultProjectFactory } from './default-project';
import { DefaultDataSourceFactory } from './default-data-source';
import { DefaultRecordSetFactory } from './default-record-set';
import { DefaultGraphicVariableMappingFactory } from './default-graphic-variable';


export class DefaultPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new DefaultProjectFactory());
    registry.registerObjectFactory(new DefaultDataSourceFactory());
    registry.registerObjectFactory(new DefaultRecordSetFactory());
    registry.registerObjectFactory(new DefaultGraphicVariableMappingFactory());
    registry.registerObjectFactory(new DefaultGraphicSymbolFactory());
    registry.registerObjectFactory(new DefaultVisualizationFactory());
    registry.registerObjectFactory(new DefaultRawDataFactory());
  }
}
