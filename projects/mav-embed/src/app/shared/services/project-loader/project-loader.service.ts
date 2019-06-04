import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectSerializerService } from '@dvl-fw/core';
import { defer, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const enum SourceType {
  global = 'global',
  url = 'url'
}

@Injectable({
  providedIn: 'root'
})
export class ProjectLoaderService {
  constructor(private http: HttpClient, private serializer: ProjectSerializerService) { }

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
        throw new Error(`Global resource must be of type string or object [key: ${name}] `)
      }
    });
  }

  loadUrl(url: string): Observable<Project> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      switchMap(yaml => this.serializer.fromYAML(yaml))
    );
  }
}
