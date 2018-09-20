import { RawData } from '../../shared/raw-data';
import { ISIDatabase } from './data-model/isi-database';


export class ISIParsedRawData implements RawData {
  template = 'json';
  data: ISIDatabase;
  private __reconstituted_data__ = false;

  constructor(public id: string, private isiData: RawData) { }

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
