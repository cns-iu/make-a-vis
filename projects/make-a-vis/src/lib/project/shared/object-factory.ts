export interface ObjectFactoryPlugin {
  register(registry: ObjectFactoryRegistry);
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
    plugins.forEach((p) => this.registerPlugin(p));
  }

  registerPlugin(plugin: ObjectFactoryPlugin) {
    if (this.plugins.indexOf(plugin) === -1) {
      this.plugins.push(plugin);
      plugin.register(this);
    }
  }
  registerObjectFactory<T = any, C = any>(objectFactory: ObjectFactory<T, C>) {
    if (!this.factories.hasOwnProperty(objectFactory.type)) {
      this.factories[objectFactory.type] = {};
    }
    this.factories[objectFactory.type][objectFactory.id] = objectFactory;
  }
  getObjectFactory<T, C = any>(objectType: string, template: string): ObjectFactory<T> {
    if (!this.hasObjectFactory(objectType, template)) {
      throw new Error(`${template} object factory of type: ${objectType} does not exist.`);
    }
    return this.factories[objectType][template];
  }
  hasObjectFactory(objectType: string, template: string): boolean {
    return this.factories.hasOwnProperty(objectType) && this.factories[objectType].hasOwnProperty(template);
  }

  async fromJSONArray<T, C = any>(objectType: string, template: string, data: any[], context?: C): Promise<T[]> {
    return await Promise.all(data.map((item) => this.fromJSON<T>(objectType, template, item, context)));
  }
  async toJSONArray<T, C = any>(objectType: string, template: string, instances: T[], context?: C): Promise<any[]> {
    return await Promise.all(instances.map((item) => this.toJSON<T>(objectType, template, item, context)));
  }
  async fromJSON<T, C = any>(objectType: string, template: string, data: any, context?: C): Promise<T> {
    const factory = this.getObjectFactory<T, C>(objectType, template);
    return await factory.fromJSON(data, context, this);
  }
  async toJSON<T, C = any>(objectType: string, template: string, instance: T, context?: C): Promise<any> {
    const factory = this.getObjectFactory<T, C>(objectType, template);
    return await factory.toJSON(instance, context, this);
  }
}
