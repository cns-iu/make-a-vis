import { ObjectFactory, ObjectFactoryRegistry, Project, RawData } from '@dvl-fw/core';

import { NSFDatabase } from '../data-model';

export class NSFParsedRawData implements RawData {
  template = 'nsfParsedData';
  private __reconstituted_data__ = false;

  constructor(public id: string, private nsfData: RawData, public data: NSFDatabase = null) { }

  async getData(): Promise<any> {
    if (!this.data) {
      const nsfFileContents = await this.nsfData.getData();
      this.data = await NSFDatabase.fromNSFFile(nsfFileContents);
      this.__reconstituted_data__ = true;
    } else if (!this.__reconstituted_data__) {
      this.data = NSFDatabase.fromJSON(this.data);
      this.__reconstituted_data__ = true;
    }

    return this.data;
  }

  toJSON(): any {
    return { id: this.id, template: this.template, data: this.data };
  }
}

export class NSFParsedRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'nsfParsedData';
  type = 'rawData';

  fromJSON(data: any, _context: Project, _registry: ObjectFactoryRegistry): RawData {
    return new NSFParsedRawData(data.id, null, data.data);
  }

  toJSON(instance: RawData, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
