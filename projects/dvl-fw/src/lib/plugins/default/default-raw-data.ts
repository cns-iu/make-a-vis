import { parse } from 'papaparse';
import { safeLoad } from 'js-yaml';

import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';


export class DefaultRawData implements RawData {
  id: string;
  template = 'default';
  private data: any;
  private url: string;
  private _parsed_data_: Promise<any>;

  constructor(data: {id: string, template: string, data?: any, url?: string}) {
    Object.assign(this, data);
  }

  setData(data: any) {
    this.data = data;
    this.url = undefined;
    this._parsed_data_ = undefined;
  }

  async getData(): Promise<any> {
    if (!this._parsed_data_) {
      if (this.data && this.template === 'csv') {
        this._parsed_data_ = this.getCSVData(this.data);
      } else if (this.data) {
        this._parsed_data_ = this.data;
      } else if (this.url) {
        this._parsed_data_ = this.getRemoteData();
      }
    }
    return await this._parsed_data_;
  }

  private async getRemoteData(): Promise<any> {
    const text = await (await fetch(this.url)).text();
    if (this.template === 'string') {
      return text;
    } else if (this.template === 'csv') {
      return this.getCSVData(text);
    } else {
      // Assumes either JSON or YAML
      return safeLoad(text);
    }
  }

  private getCSVData(text: string): any {
    const parseResults = parse(text, {header: true, dynamicTyping: true, skipEmptyLines: true});
    const results = {};
    // The data is stored in a property with the same string as the id
    results[this.id] = parseResults.data;
    return results;
  }

  toJSON(): any {
    return Object.assign({id: this.id, template: this.template, data: this.data, url: this.url});
  }
}

export class DefaultRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'default';
  type = 'rawData';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RawData | Promise<RawData> {
    if (data.template !== this.id && registry.hasObjectFactory('rawData', data.template)) {
      return registry.fromJSON<RawData>('rawData', data.template, data, context);
    }
    return new DefaultRawData(data);
  }
  toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
