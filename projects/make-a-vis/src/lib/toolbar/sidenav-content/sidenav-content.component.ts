// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';
import { ActivationEnd, Router } from '@angular/router';
import { get } from 'lodash';
import { select, Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';

import { Project, ProjectSerializerService } from '@dvl-fw/core';
import { SaveProjectService } from '../shared/services/save-project/save-project.service';
import { LoadProjectService } from '../shared/services/load-project.service';
import * as sidenavStore from '../shared/store';
import { LoggingControlService } from '../../shared/logging/logging-control.service';
import { ExportService } from '../../shared/services/export/export.service';
import { GetLinkService } from '../../shared/services/get-link/get-link.service';

export type ProjectExtensionType = 'isi' | 'nsf' | 'csv' | 'json' | 'yml';
export type ExportType = 'png' | 'svg' | 'pdf';

@Component({
  selector: 'mav-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('clipboardTarget') clipboardTargetEl: ElementRef;
  @Input() set panelsOpenState(sidenavOpenState: boolean) {
    if (!sidenavOpenState) {
      this.accordion.closeAll();
    } else {
      this.shareUrl = '';
    }
  }

  exportSnapshotType = null;
  panelOpenState = true;
  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi'];
  exportTypes: ExportType[] = ['png', 'svg', 'pdf'];
  project: Project = undefined;
  shareUrlFieldDisabled: boolean;
  private baseUrl: string;
  shareUrl = '';
  isLoggingEnabled =  true;
  clipboardMsg = 'Copy to clipboard failed!';

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

  exportSnapshot(exportType) {
    if (exportType === 'png') {
      this.exportService.exportToPng();
    } else if (exportType === 'svg') {
        this.exportService.exportToSvg();
      } else if (exportType === 'pdf') {
          this.exportService.exportToPdf();
        }
  }

  getProject(fileName: string, fileExtension: ProjectExtensionType , event: any ) {
    this.store.dispatch(new sidenavStore.LoadProjectStarted({ loadingProject: true, fileName: fileName, fileExtension: fileExtension }));

    this.loadProjectService.loadFile(fileExtension, event.srcElement.files[0], fileName)
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
            { loadingShareUrl: false, project: project, shareUrl: this.baseUrl + '?share=' + id, loadingComplete: true }
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

  isValidFileExtension(selectedExtensionOnButton, actualFileExtension) {
    if (selectedExtensionOnButton === 'nsf') {
      return (actualFileExtension === 'csv' || actualFileExtension === 'nsf');
    }
    return selectedExtensionOnButton === actualFileExtension;
  }

  readNewFile(event: any, selectedExtension: ProjectExtensionType) {
    const filename = get(event, 'srcElement.files[0].name');
    const fileExtension = filename && filename.split('.').slice(-1).toString();
    if (this.isValidFileExtension(selectedExtension , fileExtension.toLowerCase())) {
      this.getProject(filename, selectedExtension, event);
    } else {
      // TODO temporary, use logs
      alert(`${filename} has the wrong extension.`);
      console.log(`${filename} has the wrong extension.`);
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
        this.clipboardMsg = 'Copied to clipboard!';
        this.store.dispatch(new sidenavStore.CopyToClipboardSuccess({
          content: text
        }) );
      } else {
        this.clipboardMsg = 'Copy to clipboard failed!';
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
    // copies to clipboard as well
    this.copyToClipboard(this.shareUrl);
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
