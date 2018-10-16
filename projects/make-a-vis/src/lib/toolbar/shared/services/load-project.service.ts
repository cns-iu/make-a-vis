import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProjectSerializerService, Project, ActivityLogRawData } from 'dvl-fw';

 import { LoggingControlService } from '../../../shared/logging/logging-control.service';
// import { LoggingControlService } from 'make-a-vis/lib/shared/logging/logging-control.service';


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
              console.log('load project called');
              projectSubject.next(this.setSaveActivityLog(project));
            });
        } else {
          this.serializer.fromYAML(event.target.result)
            .subscribe((project: Project) => {
              console.log('load project called');
              projectSubject.next(this.setSaveActivityLog(project));
            });
        }
      }
    };
    reader.readAsText(file);
    return projectSubject;
  }
}
