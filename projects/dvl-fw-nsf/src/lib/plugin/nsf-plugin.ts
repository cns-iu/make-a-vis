import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '@dvl-fw/core';

import { NSFDataSourceFactory } from './nsf-data-source';
import { NSFParsedRawDataFactory } from './nsf-parsed-raw-data';
import { Geocoder } from 'geocoder-ts';

export class NSFPlugin implements ObjectFactoryPlugin {
  constructor(private geocoder: Geocoder) { }

  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new NSFDataSourceFactory(this.geocoder));
    registry.registerObjectFactory(new NSFParsedRawDataFactory());
  }
}
