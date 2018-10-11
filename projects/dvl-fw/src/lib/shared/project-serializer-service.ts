import { ISITemplateProject } from '../plugins/isi/isi-template-project';
import { NSFTemplateProject } from '../plugins/nsf/nsf-template-project';
import { ProjectSerializer } from './project-serializer';
import { Injectable } from '@angular/core';
import { ObjectFactoryRegistry } from './object-factory';
import { Project } from './project';
import { Observable, defer } from 'rxjs';
import { Visualization } from './visualization';

@Injectable({
  providedIn: 'root'
})
export class ProjectSerializerService {
  public registry: ObjectFactoryRegistry;

  constructor(/* TODO: Inject Plugins */) {
    this.registry = ProjectSerializer.defaultRegistry;
  }

  createProject(template: 'isi' | 'nsf' | 'csv' | 'json', fileContents: string): Observable<Project> {
    return defer<Project>(async () => {
      switch (template) {
        case 'isi':
          return await ISITemplateProject.create(fileContents);
        case 'nsf':
          return await NSFTemplateProject.create(fileContents);
        default:
          throw new Error(`Template: ${template} not supported.`);
      }
    });
  }

  createVisualization(template: string, data: Partial<Visualization>, project: Project): Observable<Visualization> {
    return defer(async () => {
      return await this.registry.fromJSON<Visualization, Project>('visualization', template, data, project);
    });
  }

  toYAML(project: Project): Observable<string> {
    return defer<string>(() => ProjectSerializer.toYAML(project, this.registry));
  }
  fromYAML(yaml: string): Observable<Project> {
    return defer<Project>(() => ProjectSerializer.fromYAML(yaml, this.registry));
  }

  toJSON(project: Project): Observable<any> {
    return defer<any>(() => ProjectSerializer.toJSON(project, this.registry));
  }
  fromJSON(json: any): Observable<Project> {
    return defer<Project>(() => ProjectSerializer.fromJSON(json, this.registry));
  }
}
