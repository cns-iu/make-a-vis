// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ActivityLogRawData, Project, ProjectSerializerService } from '@dvl-fw/core';
import { LoggingControlService } from '../../../shared/logging/logging-control.service';

@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {

  constructor(private serializer: ProjectSerializerService, private loggingControlService: LoggingControlService ) { }

  setSaveActivityLog(project) {
    const activityLogRawData = project.rawData.find(obj => obj instanceof ActivityLogRawData) as ActivityLogRawData;
    activityLogRawData.saveActivityLog = this.loggingControlService.isLoggingEnabled();
    return project;
  }
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
            .subscribe((project: Project) => {
              projectSubject.next(this.setSaveActivityLog(project));
            });
        } else {
          this.serializer.fromYAML(event.target.result)
            .subscribe((project: Project) => {
              projectSubject.next(this.setSaveActivityLog(project));
            });
        }
      }
    };
    reader.readAsText(file);
    return projectSubject;
  }

  /* loads project from json given as an argument
  */
  loadFromProjectJson(json: string) {
    const projectSubject = new BehaviorSubject<Project>(null);
    this.serializer.fromJSON(json)
      .subscribe((project: Project) => projectSubject.next(project));
    return projectSubject;
  }
}
