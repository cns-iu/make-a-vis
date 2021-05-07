import { Injectable } from '@angular/core';
import { ObjectFactoryRegistry, Project, ProjectSerializer, Visualization } from '@dvl-fw/core';
import { defer, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectSerializerService {
  public registry: ObjectFactoryRegistry;

  constructor(/* TODO: Inject Plugins */) {
    this.registry = ProjectSerializer.defaultRegistry;
  }

  createVisualization(template: string, data: Partial<Visualization>, project: Project): Observable<Visualization> {
    return defer(async () => {
      return ProjectSerializer.createVisualization(template, data, project, this.registry);
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
}
