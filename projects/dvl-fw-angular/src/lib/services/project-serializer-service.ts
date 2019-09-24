import { Injectable } from '@angular/core';
import { ObjectFactoryRegistry, Project, ProjectSerializer, Visualization } from '@dvl-fw/core';
import { ISITemplateProject } from '@dvl-fw/isi';
import { NSFTemplateProject } from '@dvl-fw/nsf';
import { isArray } from 'lodash';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectSerializerService {
  public registry: ObjectFactoryRegistry;

  constructor(/* TODO: Inject Plugins */) {
    this.registry = ProjectSerializer.defaultRegistry;
  }

  createProject(
    template: 'isi' | 'nsf' | 'csv' | 'json',
    fileContents: string[] | string, fileNames?: string[] | string
  ): Observable<Project> {
    return defer(() => this.asyncCreateProject(template, fileContents, fileNames));
  }

  createVisualization(template: string, data: Partial<Visualization>, project: Project): Observable<Visualization> {
    return defer(async () => {
      return await ProjectSerializer.createVisualization(template, data, project, this.registry);
    });
  }

  toYAML(project: Project): Observable<string> {
    return defer(() => ProjectSerializer.toYAML(project, this.registry));
  }

  fromYAML(yaml: string): Observable<Project> {
    return defer(() => ProjectSerializer.fromYAML(yaml, this.registry));
  }

  toJSON(project: Project): Observable<any> {
    return defer(() => ProjectSerializer.toJSON(project, this.registry));
  }

  fromJSON(json: any): Observable<Project> {
    return defer(() => ProjectSerializer.fromJSON(json, this.registry));
  }

  private async asyncCreateProject(
    template: 'isi' | 'nsf' | 'csv' | 'json',
    fileContents: string[] | string, fileNames?: string[] | string
  ): Promise<Project> {
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
}
