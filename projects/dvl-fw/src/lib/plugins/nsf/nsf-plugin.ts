import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { NSFDataSourceFactory } from './nsf-data-source';


export class NSFPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new NSFDataSourceFactory());
  }
}
