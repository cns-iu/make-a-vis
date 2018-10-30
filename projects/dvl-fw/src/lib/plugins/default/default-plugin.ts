// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from './../../shared/object-factory';
import { DefaultRawDataFactory } from './default-raw-data';
import { DefaultGraphicSymbolFactory } from './default-graphic-symbol';
import { DefaultVisualizationFactory } from './default-visualization';

import { DefaultDataSourceFactory } from './default-data-source';
import { DefaultGraphicVariableMappingFactory } from './default-graphic-variable';
import { DefaultProjectFactory } from './default-project';
import { DefaultRecordSetFactory } from './default-record-set';


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
