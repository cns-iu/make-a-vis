import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../object-factory';
import { DefaultDataSourceFactory } from './default-data-source';
import { DefaultGraphicSymbolFactory } from './default-graphic-symbol';
import { DefaultGraphicVariableMappingFactory } from './default-graphic-variable';
import { DefaultProjectFactory } from './default-project';
import { DefaultRawDataFactory } from './default-raw-data';
import { DefaultRecordSetFactory } from './default-record-set';
import { DefaultVisualizationFactory } from './default-visualization';

export class DefaultPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry): void {
    registry.registerObjectFactory(new DefaultProjectFactory());
    registry.registerObjectFactory(new DefaultDataSourceFactory());
    registry.registerObjectFactory(new DefaultRecordSetFactory());
    registry.registerObjectFactory(new DefaultGraphicVariableMappingFactory());
    registry.registerObjectFactory(new DefaultGraphicSymbolFactory());
    registry.registerObjectFactory(new DefaultVisualizationFactory());
    registry.registerObjectFactory(new DefaultRawDataFactory());
  }
}
