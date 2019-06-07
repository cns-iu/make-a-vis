import { Injectable } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

import { ProjectLoaderService, SourceType } from '../project-loader/project-loader.service';

/**
 * A managed project instance
 */
interface ManagedProject {
  /** The number of references to the project */
  refCount: number;
  /** The data source of the project */
  source: string;
  /** The type of the data source */
  type: SourceType;
  /** An observable emitting references to the project */
  project: Observable<Project>;
}

/**
 * Manages loading of projects
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  /**
   * Mapping from source to a managed project
   */
  private projects: { [key: string]: ManagedProject } = { };

  /**
   * Creates an instance of project manager service.
   * @param loader The project loader
   */
  constructor(private loader: ProjectLoaderService) { }

  /**
   * Creates a reference to a project
   * @param source The data source
   * @param type The type of the data source
   * @returns An observable emitting the project
   */
  add(source: string, type: SourceType): Observable<Project> {
    const { projects } = this;
    const key = this.keyFor(source, type);
    const manager = projects[key] || (projects[key] = this.createManagedProject(source, type));
    manager.refCount++;
    return manager.project;
  }

  /**
   * Removes a reference to project
   * @param source The data source
   * @param type The type of the data source
   */
  remove(source: string, type: SourceType): void {
    const { projects } = this;
    const key = this.keyFor(source, type);
    const manager = projects[key];
    if (manager && manager.refCount-- === 1) { delete projects[key]; }
  }

  /**
   * Computes the key for a source
   * @param source The data source
   * @param type The type of the data source
   * @returns A string key
   */
  private keyFor(source: string, type: SourceType): string {
    return `${type}:${source}`;
  }

  /**
   * Creates a managed project
   * @param source The data source
   * @param type The type of data source
   * @returns A new managed project instance
   */
  private createManagedProject(source: string, type: SourceType): ManagedProject {
    const resource = this.loader.load(source, type);
    const project = resource.pipe(
      publishReplay(1),
      refCount()
    );
    return { refCount: 0, source, type, project };
  }
}
