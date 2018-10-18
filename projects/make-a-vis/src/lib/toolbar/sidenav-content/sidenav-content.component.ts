import { Component, OnInit, Input, ViewChild, Inject, ElementRef  } from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';
import { Store , select } from '@ngrx/store';
import * as sidenavStore from '../shared/store';
import { Project, ProjectSerializerService } from 'dvl-fw';
import { Router, ActivationEnd } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

import { get } from 'lodash';

import { SaveProjectService } from '../shared/services/save-project/save-project.service';
import { LoadProjectService } from '../shared/services/load-project.service';
import { LoggingControlService } from '../../shared/logging/logging-control.service';
import { ExportService } from '../../shared/services/export/export.service';
import {  GetLinkService } from '../../shared/services/get-link/get-link.service';

export type NewProjectExtensionType = 'isi' | 'nsf' | 'csv' | 'json' | 'yml';
export type LoadProjectExtensionType = 'yml';

@Component({
  selector: 'mav-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css']
})
export class SidenavContentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('clipboardTarget') clipboardTargetEl: ElementRef;
  @Input() set panelsOpenState(sidenavOpenState: boolean) {
    if (!sidenavOpenState) {
      this.accordion.closeAll();
    }
  }


  exportSnapshotType = null;
  panelOpenState = true;
  newProjectFileExtension: NewProjectExtensionType;
  newProjectExtensions: NewProjectExtensionType[] = ['nsf', 'isi'];
  loadProjectExtensions: LoadProjectExtensionType[] = ['yml'];
  project: Project = undefined;
  shareUrlFieldDisabled: boolean;
  private baseUrl: string;
  shareUrl = '';
  isLoggingEnabled =  true;

  constructor(
    private saveProjectService: SaveProjectService,
    private store: Store<sidenavStore.SidenavState>,
    private loadProjectService: LoadProjectService,
    public exportService: ExportService,
    private loggingControlService: LoggingControlService,
    private projectSerializer: ProjectSerializerService,
    private getLinkService: GetLinkService,
    private router: Router,
    private clipboardService: ClipboardService
  ) {
      loggingControlService.enableLogging();
      this.isLoggingEnabled = loggingControlService.isLoggingEnabled();
      this.shareUrlFieldDisabled = true;
      this.store.pipe(select(sidenavStore.getLoadedProjectSelector))
        .subscribe((project: Project) => {
          if (project) {
            this.project = project;
          }
      });
      this.baseUrl = window.document.location.origin;
      this.baseUrl += window.location.pathname || '/';
      /* based on router state event, calculate the query param.
      * Call the getProjectFromUrl() if shared id is found in the URL.
      */
      const routerStateWatcher = this.router.events.subscribe(routerstate => {
        if (routerstate instanceof ActivationEnd ) {
          const projObjId = routerstate.snapshot.queryParams.share;
          if (projObjId) {
            this.getProjectFromUrl(projObjId);
          }
          routerStateWatcher.unsubscribe();
        }
      });

  }

  ngOnInit() {
  }

  exportSnapshot() {
    if (this.exportSnapshotType === 'png') {
      this.exportService.exportToPng();
    } else if (this.exportSnapshotType === 'svg') {
        this.exportService.exportToSvg();
      } else if (this.exportSnapshotType === 'pdf') {
          this.exportService.exportToPdf();
        }
  }

  setFileType(event: MatButtonToggleGroup) {
    this.newProjectFileExtension = event.value;
  }


  getProject(fileName: string, fileExtension: NewProjectExtensionType | LoadProjectExtensionType, event: any ) {
    this.store.dispatch(new sidenavStore.LoadProjectStarted({ loadingProject: true, fileName: fileName, fileExtension: fileExtension }));

    this.loadProjectService.loadFile(fileExtension, event.srcElement.files[0])
      .subscribe((project) => {
      if (project) { // success
        this.store.dispatch(new sidenavStore.LoadProjectCompleted(
          { loadingProject: false, fileName: fileName, fileExtension: fileExtension, project: project }
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
  getProjectFromUrl(id: string) {
    this.store.dispatch(new sidenavStore.LoadShareUrlStarted(true));
    const jsonFromIdWatcher = this.getLinkService.getJSONfromId(id).subscribe((json: any) => {
      if (json) {
        this.loadProjectService.loadFromProjectJson(json).subscribe((project) => {
          this.removeShareUrlFromAddress();
          this.store.dispatch(new sidenavStore.LoadShareUrlCompleted(
            { loadingShareUrl: false, project: project }
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
  readNewFile(event: any, isLoadProject: boolean) {
    const filename = get(event, 'srcElement.files[0].name');
    let fileExtension = filename && filename.split('.').slice(-1).toString();

    // If they've selected NSF and uploaded a CSV, assume the CSV is an NSF-formatted CSV file.
    if (!isLoadProject && fileExtension === 'csv' && this.newProjectFileExtension === 'nsf') {
      fileExtension = 'nsf';
    }

    if (filename && fileExtension) {
      if (isLoadProject && this.loadProjectExtensions.indexOf(fileExtension) !== -1) {
        this.getProject(filename, fileExtension, event);
      } else if (!isLoadProject
          && this.newProjectExtensions.indexOf(this.newProjectFileExtension) !== -1
          && fileExtension === this.newProjectFileExtension) {
        this.getProject(filename, fileExtension, event);
      } else {
        // TODO temporary, use logs
        alert(`${filename} has the wrong extension.`);
        console.log(`${filename} has the wrong extension.`);
      }
    }
  }

  /*
  * This function get Project state from a store/reducer,
  * then sends that state to a service that does an http post
  * request to an endpoint.
  * The response of that endpoint is an object id.
  * uses document to get  url and append the id to form
  * a share url.
  * disables the textfield if it is waiting for response, and
  * enables it after getting the response.
  * unsubscribe after all of the above occurs, and subscribe again
  * if clicked again.
  */
  getUrlLink()  {
    this.shareUrlFieldDisabled = true;
    /* dispatch an action stating create url has started */
    this.store.dispatch(new sidenavStore.CreateShareUrlStarted(true));
    /* get project state from the reducer*/
    const stateObs = this.store.pipe(select(sidenavStore.getLoadedProjectSelector))
        .subscribe((prj: Project) => {
          if (prj) {
            this.projectSerializer.toJSON(prj).subscribe(
              prj_json => {
                this.getLinkService.getJSONobjId(prj_json).subscribe(
                  object_id => {
                    /* {'id': 'someid'} */
                    this.shareUrl =  this.baseUrl + '?share=' + object_id['id'];
                    this.shareUrlFieldDisabled = false;
                    /* dispatch an action stating create url has completed */
                    this.store.dispatch(new sidenavStore.CreateShareUrlCompleted({
                      shareUrl: this.shareUrl,
                      creatingShareUrl: false,
                      project: prj
                    }));
                  }, err => {
                    this.shareUrl =  '';
                    this.shareUrlFieldDisabled = true;
                    this.store.dispatch(new sidenavStore.CreateShareUrlError({
                      errorOccurred: true,
                      errorTitle: err.name,
                      errorMessage: err.message
                    }));
                  });

              },
              /* dispatch an action stating create url has thrown an error */
              err => {this.shareUrlFieldDisabled = true;
                this.shareUrl =  '';
                this.store.dispatch(new sidenavStore.CreateShareUrlError({
                errorOccurred: true,
                errorTitle: err.name,
                errorMessage: err.message
              })); } );
          } else {
            this.shareUrlFieldDisabled = true;
            this.shareUrl =  '';
            this.store.dispatch(new sidenavStore.CreateShareUrlError({
              errorOccurred: true,
              errorTitle: 'Project state not found',
              errorMessage: 'Looks like you have no active projects openened'
            }));
            console.error('getUrlLink()' , 'could not get Project state from store');
          }

      });
      /* unsubscribed because get link would trigger on every project load */
      stateObs.unsubscribe();
  }

  saveProject() {
    if (this.project) {
      this.saveProjectService.save(this.project);
    }
  }

  toggleLogging() {
    this.loggingControlService.toggleLogging();
    this.isLoggingEnabled = this.loggingControlService.isLoggingEnabled();
  }


copyToClipboard(text: string) {
    let isCopySuccessfull = false;
    let errorObj = {name: 'Copy to clipboard failed.',
                    message: 'Copy to clipboard failed.'};
    try {
      isCopySuccessfull = this.clipboardService.copyFromContent(text);
    } catch (error) {
      isCopySuccessfull = false;
      errorObj = error;
    }
    if (isCopySuccessfull) {
      this.store.dispatch(new sidenavStore.CopyToClipboardSuccess({
        content: text
      }) );
    } else {
      this.store.dispatch(new sidenavStore.CopyToClipboardError({
        errorOccurred: true,
        content: text,
        errorTitle: errorObj.name,
        errorMessage: errorObj.message
      }) );
    }
  }

/* below are non angular ways of some features */
selectTextFromElement(ele: any): boolean {
  try {
  ele.select();
  } catch (err) {
    console.log('select share url failed - clipboard');
    return false;
  }
  return true;
}

removeShareUrlFromAddress() {
  if (window.history && window.history.pushState) {
    window.history.pushState('mav', 'mav', '/');
    return true;
  }
  return false;
}
}
