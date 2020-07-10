import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';

import { ISIDataSourceFactory } from './isi-data-source';
import { ISIParsedRawDataFactory } from './isi-parsed-raw-data';
import { Geocoder } from 'geocoder-ts';

export class ISIPlugin implements ObjectFactoryPlugin {
  constructor(private geocoder: Geocoder) { }

  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ISIDataSourceFactory(this.geocoder));
    registry.registerObjectFactory(new ISIParsedRawDataFactory(this.geocoder));
  }
}
