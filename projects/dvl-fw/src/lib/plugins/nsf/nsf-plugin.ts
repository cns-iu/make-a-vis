import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { NSFDataSourceFactory } from './nsf-data-source';
import { NSFParsedRawDataFactory } from './nsf-parsed-raw-data';


export class NSFPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new NSFDataSourceFactory());
    registry.registerObjectFactory(new NSFParsedRawDataFactory());
  }
}
