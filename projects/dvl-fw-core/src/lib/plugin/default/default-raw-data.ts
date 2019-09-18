import { safeLoad } from 'js-yaml';
import { isArray } from 'lodash';

import { parse } from '../../csv';
import { Project, RawData } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';

export type DefaultRawDataArg =
  Pick<RawData, 'id' | 'template'> &
  Partial<{ data: any, url: string }>;

export class DefaultRawData implements RawData {
  id: string;
  template = 'default';
  private data: any;
  private url: string;
  private _parsed_data_: Promise<any>;

  constructor(data: DefaultRawDataArg) {
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
        this._parsed_data_ = this.asObjectStore(this.data);
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
      return this.asObjectStore(safeLoad(text));
    }
  }

  private getCSVData(text: string): any {
    const parseResults = parse(text, { header: true, dynamicTyping: true, skipEmptyLines: true });
    return this.asObjectStore(parseResults.data);
  }

  private asObjectStore(data: unknown): any {
    if (isArray(data)) {
      const results = {};
      // The data is stored in a property with the same string as the id
      results[this.id] = data;
      return results;
    } else {
      return data;
    }
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

  toJSON(instance: RawData, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
