import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectSerializerService } from '@dvl-fw/angular';
import { Project } from '@dvl-fw/core';
import { ISIPlugin } from '@dvl-fw/isi';
import { NgxDinoPlugin } from '@dvl-fw/ngx-dino';
import { NSFPlugin } from '@dvl-fw/nsf';
import { defer, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';


/**
 * Type of data source
 */
export const enum SourceType {
  global = 'global',
  url = 'url'
}

/**
 * A service for loading dvl-fw projects
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectLoaderService {
  /**
   * Creates an instance of project loader service.
   * @param http The http client
   * @param serializer The project serializer/deserializer
   */
  constructor(private http: HttpClient, private serializer: ProjectSerializerService) {
    const registry = this.serializer.registry;

    // TODO: Add a way to register plugins on the fly
    registry.registerPlugin(new NgxDinoPlugin());
    registry.registerPlugin(new ISIPlugin());
    registry.registerPlugin(new NSFPlugin());
  }

  /**
   * Loads a project from a source
   * @param source The source
   * @param type The type of the data source
   * @returns The loaded project
   */
  load(source: string, type: SourceType): Observable<Project> {
    switch (type) {
      case SourceType.global:
        return this.loadGlobal(source);

      case SourceType.url:
        return this.loadUrl(source);

      default:
        return throwError(`Unknown resource type '${type}' [source: ${source}]`);
    }
  }

  /**
   * Loads a project from a global variable
   *
   * @param name The name of the global variable
   * @returns The loaded project
   */
  loadGlobal(name: string): Observable<Project> {
    return defer(() => {
      const type = typeof globalThis[name];
      if (type === 'object') {
        return of(globalThis[name]);
      } else if (type === 'string') {
        return this.serializer.fromYAML(globalThis[name]);
      } else if (type === 'undefined') {
        throw new Error(`Global resource not found [key: ${name}]`);
      } else {
        throw new Error(`Global resource must be of type string or object [key: ${name}] `);
      }
    });
  }

  /**
   * Loads a project from a url
   *
   * @param url The project url
   * @returns The loaded project
   */
  loadUrl(url: string): Observable<Project> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      switchMap(yaml => this.serializer.fromYAML(yaml))
    );
  }
}
