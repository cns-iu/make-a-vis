import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProjectSerializerService, Project } from 'dvl-fw';


@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {

  constructor(private serializer: ProjectSerializerService) { }

  loadFile(
    fileExtension: 'isi' | 'nsf' | 'csv' | 'json' | 'yml',
    file: Blob
  ): BehaviorSubject<Project> {
    const reader = new FileReader();
    const projectSubject = new BehaviorSubject<Project>(null);
    reader.onload = (event: any) => {
      if (event.target.result !==  null) {
        if (fileExtension !== 'yml') {
          this.serializer.createProject(<any>fileExtension, event.target.result)
            .subscribe((project: Project) => projectSubject.next(project));
        } else {
          this.serializer.fromYAML(event.target.result)
            .subscribe((project: Project) => projectSubject.next(project));
        }
      }
    };
    reader.readAsText(file);
    return projectSubject;
  }
}
