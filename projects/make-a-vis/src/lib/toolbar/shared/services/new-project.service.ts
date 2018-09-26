import { Injectable } from '@angular/core';

import { ProjectSerializerService, Project } from 'dvl-fw';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewProjectService {

  project: Project; // NOT TO COMMIT
  constructor(private serializer: ProjectSerializerService) { }

  readFile( // TODO WIP
    fileExtension: 'isi' | 'nsf' | 'csv' | 'json',
    file: Blob
  ) {
    const reader = new FileReader();
    let projectObservable = new Observable<Project>(null);
    let project = null;
    reader.onload = (event: any) => {
      if (event.target.result !==  null) {
        projectObservable = this.serializer.createProject(fileExtension, event.target.result);
        projectObservable.subscribe((p) => {
          if (p) {
            this.project = p;
            project = p;
          }
        });
      }
    };
    reader.readAsText(file);
  }
}
