import { safeDump, safeLoad } from 'js-yaml';

import { Project } from './project';
import { ObjectFactoryRegistry, ObjectFactoryPlugin } from './object-factory';

import { DefaultPlugin } from '../plugins/default/default-plugin';

export class ProjectSerializer {
  static defaultPlugins: ObjectFactoryPlugin[] = [ new DefaultPlugin() ];

  static defaultRegistry = new ObjectFactoryRegistry(ProjectSerializer.defaultPlugins);
  static async toJSON(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<any> {
    return registry.toJSON<Project>('project', 'default', project, project);
  }
  static async fromJSON(data: any, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    return registry.fromJSON<Project>('project', 'default', data, null);
  }

  static async toYAML(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<string> {
    const data = await ProjectSerializer.toJSON(project, registry);
    return safeDump(data, { skipInvalid: true });
  }
  static async fromYAML(yaml: string, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    const data = safeLoad(yaml);
    return await ProjectSerializer.fromJSON(data, registry);
  }
}
