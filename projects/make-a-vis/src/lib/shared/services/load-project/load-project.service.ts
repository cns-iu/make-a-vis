// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { ActivityLogRawData, Project, ProjectSerializerService } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { LoggingControlService } from '../../../shared/logging/logging-control.service';
import * as sidenavStore from '../../../toolbar/shared/store';
import { GetLinkService } from '../get-link/get-link.service';

@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {

  projectExtensionPool = [
    { label: 'isi', extensions: ['.isi'] },
    { label: 'nsf', extensions: ['.nsf', '.csv'] },
    { label: 'csv', extensions: ['.nsf', '.csv'] },
    { label: 'json', extensions: ['.json'] },
    { label: 'yml', extensions: ['.yml'] }
  ];

  constructor(
    private serializer: ProjectSerializerService,
    private loggingControlService: LoggingControlService,
    private store: Store<sidenavStore.SidenavState>,
    private getLinkService: GetLinkService) { }

  setSaveActivityLog(project) {
    const activityLogRawData = project.rawData.find(obj => obj instanceof ActivityLogRawData) as ActivityLogRawData;
    activityLogRawData.saveActivityLog = this.loggingControlService.isLoggingEnabled();
    return project;
  }

  loadFile(
    fileExtension: 'isi' | 'nsf' | 'csv' | 'json' | 'yml',
    files: Blob[],
    fileNames?: string[]
  ): BehaviorSubject<Project> {
    const projectSubject = new BehaviorSubject<Project>(null);
    const promises = [];
    for (const file of files) {
      const filePromise = new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event: any) => {
          if (fileExtension !== 'yml') {
            resolve(reader.result);
          } else {
            this.serializer.fromYAML(event.target.result)
              .subscribe((project: Project) => {
                projectSubject.next(this.setSaveActivityLog(project));
              });
          }
        };
      });

      promises.push(filePromise);
    }

    Promise.all(promises).then((fileContents: string[]) => {
      this.serializer.createProject(<any>fileExtension, fileContents, fileNames)
        .subscribe((project: Project) => {
          projectSubject.next(this.setSaveActivityLog(project));
        });
    });

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

  getProject(fileNames: string[], fileExtension: ProjectExtensionType, event: any) {
    this.store.dispatch(new sidenavStore.LoadProjectStarted({
      loadingProject: true, fileName: fileNames.join('|'), fileExtension: fileExtension
    }));

    this.loadFile(fileExtension, event.srcElement.files, fileNames)
      .subscribe((project) => {
        if (project) { // success
          this.store.dispatch(new sidenavStore.LoadProjectCompleted(
            { loadingProject: false, fileName: fileNames.join('|'), fileExtension: fileExtension, project: project }
          ));
        } else { // failure
          this.store.dispatch(new sidenavStore.LoadProjectError(
            { errorOccurred: true, errorTitle: 'Load Error', errorMessage: 'Failed to load new project' }
          ));
        }
      });
  }

  /*
  * given a project object id from the url, this funtion renders it.
  * used getProject()'s stuff to write this function, probably need a new action.
  */
  getProjectFromUrl(id: string, baseUrl: string, removeShareUrlFromAddressCallback: any) {
    this.store.dispatch(new sidenavStore.LoadShareUrlStarted(true));
    const jsonFromIdWatcher = this.getLinkService.getJSONfromId(id).subscribe((json: any) => {
      if (json) {
        this.loadFromProjectJson(json).subscribe((project) => {
          removeShareUrlFromAddressCallback();
          this.store.dispatch(new sidenavStore.LoadShareUrlCompleted(
            { loadingShareUrl: false, project: project, shareUrl: baseUrl + '?share=' + id, loadingComplete: true }
          ));
        }, err => {
          this.store.dispatch(new sidenavStore.LoadShareUrlError(
            { errorOccurred: true, errorTitle: err.name, errorMessage: 'Failed to load new project from URL:' + err.message }
          ));
        });
      } else {
        this.store.dispatch(new sidenavStore.LoadShareUrlError(
          { errorOccurred: true, errorTitle: 'Load Error', errorMessage: 'Failed to load new project from URL' }
        ));
      }
      jsonFromIdWatcher.unsubscribe();
    }, err => {
      this.store.dispatch(new sidenavStore.LoadShareUrlError(
        { errorOccurred: true, errorTitle: err.name, errorMessage: 'Failed to load new project from URL:' + err.message }
      ));
    });
  }

  getSupportedExtension(extensionLabel: ProjectExtensionType): string {
    return this.projectExtensionPool.filter((extnObject => {
      return extnObject.label === extensionLabel;
    }))[0]['extensions'].join(',');
  }
}

export type ProjectExtensionType = 'isi' | 'nsf' | 'csv' | 'json' | 'yml';
