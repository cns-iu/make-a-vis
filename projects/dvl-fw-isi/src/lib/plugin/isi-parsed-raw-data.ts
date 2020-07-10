import { ObjectFactory, ObjectFactoryRegistry, Project, RawData } from '@dvl-fw/core';

import { ISIDatabase } from '../data-model';

export class ISIParsedRawData implements RawData {
  template = 'isiParsedData';
  private __reconstituted_data__ = false;

  constructor(public id: string, private isiData: RawData, public data: ISIDatabase = null) { }

  async getData(): Promise<any> {
    if (!this.data) {
      const isiFileContents = await this.isiData.getData();
      this.data = await ISIDatabase.fromISIFile(isiFileContents);
      this.__reconstituted_data__ = true;
    } else if (!this.__reconstituted_data__) {
      this.data = ISIDatabase.fromJSON(this.data);
      this.__reconstituted_data__ = true;
    }

    return this.data;
  }

  toJSON() {
    return { id: this.id, template: this.template, data: this.data };
  }
}

export class ISIParsedRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'isiParsedData';
  type = 'rawData';

  fromJSON(data: any, _context: Project, _registry: ObjectFactoryRegistry): RawData {
    return new ISIParsedRawData(data.id, null, data.data);
  }

  toJSON(instance: RawData, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
