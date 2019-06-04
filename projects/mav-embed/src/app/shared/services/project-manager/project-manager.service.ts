import { Injectable } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

import { ProjectLoaderService, SourceType } from '../project-loader/project-loader.service';

interface ManagedProject {
  refCount: number;
  source: string;
  type: SourceType;
  project: Observable<Project>;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private projects: { [key: string]: ManagedProject } = { };

  constructor(private loader: ProjectLoaderService) { }

  add(source: string, type: SourceType): Observable<Project> {
    const { projects } = this;
    const key = this.keyFor(source, type);
    const manager = projects[key] || (projects[key] = this.createManagedProject(source, type));
    manager.refCount++;
    return manager.project;
  }

  remove(source: string, type: SourceType): void {
    const { projects } = this;
    const key = this.keyFor(source, type);
    const manager = projects[key];
    if (manager && manager.refCount-- === 1) { delete projects[key]; }
  }

  private keyFor(source: string, type: SourceType): string {
    return `${type}:${source}`;
  }

  private createManagedProject(source: string, type: SourceType): ManagedProject {
    const resource = this.loader.load(source, type);
    const project = resource.pipe(
      publishReplay(1),
      refCount()
    );
    return { refCount: 0, source, type, project };
  }
}
