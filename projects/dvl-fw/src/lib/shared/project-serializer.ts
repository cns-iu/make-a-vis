import { safeDump, safeLoad } from 'js-yaml';
import { isArray } from 'lodash';

import { ActivityLogPlugin } from '../plugins/activity-log/log-plugin';
import { DefaultPlugin } from '../plugins/default/default-plugin';
import { ISIPlugin } from '../plugins/isi/isi-plugin';
import { NgxDinoPlugin } from '../plugins/ngx-dino/ngx-dino-plugin';
import { NSFPlugin } from '../plugins/nsf/nsf-plugin';
import { NSFTemplateProject } from '../plugins/nsf/nsf-template-project';
import { ISITemplateProject } from '../plugins/isi/isi-template-project';
import { ObjectFactoryRegistry, ObjectFactoryPlugin } from './object-factory';
import { Project } from './project';
import { Visualization } from './visualization';


export class ProjectSerializer {
  static defaultPlugins: ObjectFactoryPlugin[] = [
    new DefaultPlugin(), new ISIPlugin(), new NSFPlugin(), new NgxDinoPlugin(), new ActivityLogPlugin()
  ];

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

  static async createProject(template: 'isi' | 'nsf' | 'csv' | 'json',
    fileContents: string[] | string, fileNames?: string[] | string): Promise<Project> {
    fileNames = isArray(fileNames) || !fileNames ? fileNames : [fileNames];
    switch (template) {
      case 'csv':
        // fall through NSFTemplateProject
      case 'nsf':
        return await NSFTemplateProject.create(fileContents, fileNames);
      case 'isi':
        return await ISITemplateProject.create(fileContents[0], fileNames[0]);
      default:
        throw new Error(`Template: ${template} not supported.`);
    }
  }
  static createVisualization(template: string, data: Partial<Visualization>, project: Project,
      registry: ObjectFactoryRegistry = ProjectSerializer.defaultRegistry): Promise<Visualization> {
    return registry.fromJSON<Visualization, Project>('visualization', template, data, project);
  }
}
