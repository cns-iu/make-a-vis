// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { ISIDatabase } from './data-model/isi-database';

export class ISIParsedRawData implements RawData {
  template = 'isiParsedData';
  private __reconstituted_data__ = false;

  constructor(public id: string, private isiData: RawData, public data: ISIDatabase = null) { }

  async getData(): Promise<any> {
    if (!this.data) {
      const isiFileContents = await this.isiData.getData();
      this.data = ISIDatabase.fromISIFile(isiFileContents);
      this.__reconstituted_data__ = true;
    } else if (!this.__reconstituted_data__) {
      this.data = ISIDatabase.fromJSON(this.data);
      this.__reconstituted_data__ = true;
    }
    return this.data;
  }
  toJSON() {
    return Object.assign({id: this.id, template: this.template, data: this.data});
  }
}

export class ISIParsedRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'isiParsedData';
  type = 'rawData';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RawData | Promise<RawData> {
    return new ISIParsedRawData(data.id, null, data.data);
  }
  toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
