import { RawData } from '../../shared/raw-data';
import { NSFDatabase } from './data-model/nsf-database';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';


export class NSFParsedRawData implements RawData {
  template = 'nsfParsedData';
  private __reconstituted_data__ = false;

  constructor(public id: string, private nsfData: RawData, public data: NSFDatabase = null) { }

  async getData(): Promise<any> {
    if (!this.data) {
      const nsfFileContents = await this.nsfData.getData();
      this.data = NSFDatabase.fromNSFFile(nsfFileContents);
      this.__reconstituted_data__ = true;
    } else if (!this.__reconstituted_data__) {
      this.data = NSFDatabase.fromJSON(this.data);
      this.__reconstituted_data__ = true;
    }
    return this.data;
  }
  toJSON() {
    return Object.assign({id: this.id, template: this.template, data: this.data});
  }
}

export class NSFParsedRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'nsfParsedData';
  type = 'rawData';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RawData | Promise<RawData> {
    return new NSFParsedRawData(data.id, null, data.data);
  }
  toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
