import { dump, load } from 'js-yaml';

import { Project, Visualization } from '../interfaces';
import { ActivityLogPlugin, DefaultPlugin, ObjectFactoryPlugin, ObjectFactoryRegistry } from '../plugin';

export class ProjectSerializer {
  static defaultPlugins: ObjectFactoryPlugin[] = [
    new DefaultPlugin(), new ActivityLogPlugin()
  ];

  static defaultRegistry = new ObjectFactoryRegistry(ProjectSerializer.defaultPlugins);

  static async toJSON(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<any> {
    return registry.toJSON<Project>('project', 'default', project, project);
  }

  static async fromJSON(data: any, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    return registry.fromJSON<Project>('project', 'default', data);
  }

  static async toYAML(project: Project, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<string> {
    const data = await ProjectSerializer.toJSON(project, registry);
    return dump(data, { skipInvalid: true });
  }

  static async fromYAML(yaml: string, registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Project> {
    return ProjectSerializer.fromJSON(load(yaml), registry);
  }

  static createVisualization(
    template: string, data: Partial<Visualization>, project: Project,
    registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry
  ): Promise<Visualization> {
    return registry.fromJSON<Visualization, Project>('visualization', template, data, project);
  }
}
