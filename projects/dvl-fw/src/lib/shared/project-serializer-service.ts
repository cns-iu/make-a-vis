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

  toYAML(project: Project): Observable<string> {
    return defer<string>(() => ProjectSerializer.toYAML(project, this.registry));
  }
  fromYAML(yaml: string): Observable<Project> {
    return defer<Project>(() => ProjectSerializer.fromYAML(yaml, this.registry));
  }
}
