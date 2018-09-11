import { RawData } from '../../shared/raw-data';
import { createISIDatabase, ISIDatabase } from './data-model/isi-database';


export class ISIParsedRawData implements RawData {
  template = 'json';
  data: any;

  constructor(public id: string, private isiData: RawData) { }

  async getData(): Promise<any> {
    if (!this.data) {
      const isiFileContents = await this.isiData.getData();
      this.data = createISIDatabase(isiFileContents);
    }
    return this.data;
  }
  toJSON() {
    return Object.assign({id: this.id, template: this.template, data: this.data});
  }
}
