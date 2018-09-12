import { ISITemplateProject } from './../plugins/isi/isi-template-project';
import { ProjectSerializer } from './project-serializer';
import { Injectable } from '@angular/core';
import { ObjectFactoryRegistry } from './object-factory';
import { Project } from './project';
import { Observable, defer } from 'rxjs';

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
        default:
          throw new Error(`Template: ${template} not supported.`);
      }
    });
  }

  toYAML(project: Project): Observable<string> {
    return defer<string>(() => ProjectSerializer.toYAML(project, this.registry));
  }
  fromYAML(yaml: string): Observable<Project> {
    return defer<Project>(() => ProjectSerializer.fromYAML(yaml, this.registry));
  }
}
