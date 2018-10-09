import { RawData } from '../../shared/raw-data';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';


export class DefaultRawData implements RawData {
  id: string;
  template = 'default';
  private data: any;
  private url: string;
  private _url_data_: any;

  constructor(data: {id: string, template: string, data?: any, url?: string}) {
    Object.assign(this, data);
  }

  setData(data: any) {
    this.data = data;
    this.url = undefined;
    this._url_data_ = undefined;
  }

  async getData(): Promise<any> {
    if (this.data) {
      return this.data;
    } else if (this._url_data_) {
      return this._url_data_;
    } else if (this.url) {
      const data = (await fetch(this.url));
      if (this.template === 'string') {
        this._url_data_ = await data.text();
      } else {
        this._url_data_ = await data.json();
      }
      return this._url_data_;
    } else {
      return {};
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
    if (registry.hasObjectFactory('rawData', data.template)) {
      return registry.fromJSON<RawData>('rawData', data.template, data, context);
    }
    return new DefaultRawData(data);
  }
  toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
