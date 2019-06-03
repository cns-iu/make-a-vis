import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { defer, Observable, of, throwError } from 'rxjs';

export const enum SourceType {
  global = 'global',
  url = 'url'
}

@Injectable({
  providedIn: 'root'
})
export class ResourceLoaderService {
  constructor(private http: HttpClient) { }

  load(source: string, type: SourceType): Observable<string | Project> {
    switch (type) {
      case SourceType.global:
        return this.loadGlobal(source);

      case SourceType.url:
        return this.loadUrl(source);

      default:
        return throwError(`Unknown resource type '${type}' [source: ${source}]`);
    }
  }

  loadGlobal(name: string): Observable<string | Project> {
    return defer(() => {
      const type = typeof globalThis[name];
      if (type !== 'string' && type !== 'object') {
        throw new Error(`Global resource must be of type string or object [key: ${name}] `);
      }
      return of(globalThis[name]);
    });
  }

  loadUrl(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
