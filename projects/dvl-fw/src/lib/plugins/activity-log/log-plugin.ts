import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ActivityLogRawDataFactory } from './log-raw-data';
import { ActivityLogDataSourceFactory } from './log-data-source';


export class ActivityLogPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ActivityLogDataSourceFactory());
    registry.registerObjectFactory(new ActivityLogRawDataFactory());
  }
}
