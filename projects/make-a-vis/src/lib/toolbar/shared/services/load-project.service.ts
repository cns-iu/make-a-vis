import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ProjectSerializerService, Project } from 'dvl-fw';


@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {

  constructor(private serializer: ProjectSerializerService) { }

  loadFile(
    fileExtension: 'isi' | 'nsf' | 'csv' | 'json' | 'yml',
    file: Blob
  ): Observable<Project> {
    const reader = new FileReader();
    let projectObservable = new Observable<Project>(null);
    reader.onload = (event: any) => {
      if (event.target.result !==  null) {
        if (fileExtension !== 'yml') {
          projectObservable = this.serializer.createProject(<any>fileExtension, event.target.result);
        } else {
          projectObservable = this.serializer.fromYAML(event.target.result);
        }
      }
    };
    reader.readAsText(file);
    return projectObservable;
  }
}
