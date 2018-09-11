import { RawData } from '../../shared/raw-data';
import { parseISIFile } from './isi-records';


export class ISIParsedRawData implements RawData {
  template = 'json';
  data: any;

  constructor(public id: string, private isiData: RawData) { }

  parseRawData(isiFileContent: string): any {
    const publications = parseISIFile(isiFileContent);
    return {
      publications
    };
  }

  async getData(): Promise<any> {
    if (!this.data) {
      const isiFileContents = await this.isiData.getData();
      this.data = this.parseRawData(isiFileContents);
    }
    return this.data;
  }
  toJSON() {
    return Object.assign({id: this.id, template: this.template, data: this.data});
  }
}
