import { safeDump, safeLoad } from 'js-yaml';

import { Project, Visualization } from '../interfaces';
import { DefaultPlugin, ObjectFactoryPlugin, ObjectFactoryRegistry } from '../plugin';

export class ProjectSerializer {
  static defaultPlugins: ObjectFactoryPlugin[] = [
    new DefaultPlugin()
  ];

  static defaultRegistry = new ObjectFactoryRegistry(ProjectSerializer.defaultPlugins);

  static async toJSON(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<any> {
    return registry.toJSON<Project>('project', 'default', project, project);
  }

  static async fromJSON(data: any, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    return registry.fromJSON<Project>('project', 'default', data);
  }

  static async toYAML(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<string> {
    return safeDump(await ProjectSerializer.toJSON(project, registry), { skipInvalid: true });
  }

  static async fromYAML(yaml: string, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    return ProjectSerializer.fromJSON(safeLoad(yaml), registry);
  }

  static createVisualization(
    template: string, data: Partial<Visualization>, project: Project,
    registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry
  ): Promise<Visualization> {
    return registry.fromJSON<Visualization, Project>('visualization', template, data, project);
  }
}
