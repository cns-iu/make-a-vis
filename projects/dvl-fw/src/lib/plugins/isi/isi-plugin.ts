// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactoryPlugin, ObjectFactoryRegistry } from '../../shared/object-factory';
import { ISIDataSourceFactory } from './isi-data-source';
import { ISIParsedRawDataFactory } from './isi-parsed-raw-data';


export class ISIPlugin implements ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry) {
    registry.registerObjectFactory(new ISIDataSourceFactory());
    registry.registerObjectFactory(new ISIParsedRawDataFactory());
  }
}
