import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';

import { ISIDataSourceFactory } from './isi-data-source';
import { ISIParsedRawDataFactory } from './isi-parsed-raw-data';

export class ISIPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ISIDataSourceFactory());
    registry.registerObjectFactory(new ISIParsedRawDataFactory());
  }
}
