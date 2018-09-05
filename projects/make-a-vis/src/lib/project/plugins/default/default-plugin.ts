import { DefaultGraphicVariableMappingFactory } from './default-graphic-variable-mapping';
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from './../../shared/object-factory';

import { DefaultProjectFactory } from './default-project';
import { DefaultDataSourceFactory } from './default-data-source';
import { DefaultRecordSetFactory } from './default-record-set';

export class DefaultPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new DefaultProjectFactory());
    registry.registerObjectFactory(new DefaultDataSourceFactory());
    registry.registerObjectFactory(new DefaultRecordSetFactory());
    registry.registerObjectFactory(new DefaultGraphicVariableMappingFactory());
  }
}
