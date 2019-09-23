import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../object-factory';
import { ActivityLogDataSourceFactory } from './log-data-source';
import { ActivityLogRawDataFactory } from './log-raw-data';


export class ActivityLogPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ActivityLogDataSourceFactory());
    registry.registerObjectFactory(new ActivityLogRawDataFactory());
  }
}
