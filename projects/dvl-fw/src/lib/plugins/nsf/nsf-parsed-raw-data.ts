import { RawData } from '../../shared/raw-data';
import { NSFDatabase } from './data-model/nsf-database';


export class NSFParsedRawData implements RawData {
  template = 'json';
  data: NSFDatabase;
  private __reconstituted_data__ = false;

  constructor(public id: string, private nsfData: RawData) { }

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
