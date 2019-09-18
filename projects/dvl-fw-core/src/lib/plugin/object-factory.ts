import { forEach, get, has, includes, map, set } from 'lodash';

export interface ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry): void;
}

export interface ObjectFactory<T, C = any> {
  id: string;
  type: string;

  fromJSON(data: any, context: C, registry: ObjectFactoryRegistry): T | Promise<T>;
  toJSON(instance: T, context: C, registry: ObjectFactoryRegistry): any | Promise<any>;
}

export interface ObjectFactoryMap<T, C = any> {
  [template: string]: ObjectFactory<T, C>;
}

export class ObjectFactoryRegistry {
  readonly plugins: ObjectFactoryPlugin[] = [];
  private factories: { [ factoryType: string]: ObjectFactoryMap<any, any> } = {};

  constructor(plugins: ObjectFactoryPlugin[] = []) {
    forEach(plugins, plugin => this.registerPlugin(plugin));
  }

  registerPlugin(plugin: ObjectFactoryPlugin) {
    if (!includes(this.plugins, plugin)) {
      this.plugins.push(plugin);
      plugin.register(this);
    }
  }

  registerObjectFactory<T = any, C = any>(objectFactory: ObjectFactory<T, C>) {
    set(this.factories, [objectFactory.type, objectFactory.id], objectFactory);
  }

  getObjectFactory<T, C = any>(objectType: string, template: string): ObjectFactory<T, C> {
    const factory = get(this.factories, [objectType, template]);
    if (factory !== undefined) { return factory; }
    throw new Error(`${template} object factory of type: ${objectType} does not exist.`);
  }

  hasObjectFactory(objectType: string, template: string): boolean {
    return has(this.factories, [objectType, template]);
  }

  async fromJSONArray<T, C = any>(objectType: string, template: string, data: any[], context?: C): Promise<T[]> {
    const promises = map(data, item => this.fromJSON<T>(objectType, template, item, context));
    return Promise.all(promises);
  }

  async toJSONArray<T, C = any>(objectType: string, template: string, instances: T[], context?: C): Promise<any[]> {
    const promises = map(instances, instance => this.toJSON<T>(objectType, template, instance, context));
    return Promise.all(promises);
  }

  async fromJSON<T, C = any>(objectType: string, template: string, data: any, context?: C): Promise<T> {
    const factory = this.getObjectFactory<T, C>(objectType, template);
    return factory.fromJSON(data, context, this);
  }

  async toJSON<T, C = any>(objectType: string, template: string, instance: T, context?: C): Promise<any> {
    const factory = this.getObjectFactory<T, C>(objectType, template);
    return factory.toJSON(instance, context, this);
  }
}
