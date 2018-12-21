// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';

import { CSVTemplateProject } from '../plugins/default/csv-template-project';
import { ISITemplateProject } from '../plugins/isi/isi-template-project';
import { NSFTemplateProject } from '../plugins/nsf/nsf-template-project';
import { ObjectFactoryRegistry } from './object-factory';
import { Project } from './project';
import { ProjectSerializer } from './project-serializer';
import { Visualization } from './visualization';

@Injectable({
  providedIn: 'root'
})
export class ProjectSerializerService {
  public registry: ObjectFactoryRegistry;

  constructor(/* TODO: Inject Plugins */) {
    this.registry = ProjectSerializer.defaultRegistry;
  }

  createProject(template: 'isi' | 'nsf' | 'csv' | 'json', fileContents: string, fileName?: string): Observable<Project> {
    return defer<Project>(async () => {
      switch (template) {
        case 'csv':
          return await CSVTemplateProject.create(fileContents, fileName);
        case 'isi':
          return await ISITemplateProject.create(fileContents, fileName);
        case 'nsf':
          return await NSFTemplateProject.create(fileContents, fileName);
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
