// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, ElementRef, Input, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatAccordion } from '@angular/material/expansion';
import { ActivationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get } from 'lodash';
import { select, Store } from '@ngrx/store';
import { ClipboardService } from 'ngx-clipboard';

import { Project, ProjectSerializerService } from '@dvl-fw/core';
import { SaveProjectService } from '../shared/services/save-project/save-project.service';
import { LoadProjectService, ProjectExtensionType } from '../../shared/services/load-project/load-project.service';
import * as sidenavStore from '../shared/store';
import { LoggingControlService } from '../../shared/logging/logging-control.service';
import { ExportService } from '../../shared/services/export/export.service';
import { GetLinkService } from '../../shared/services/get-link/get-link.service';

export type ExportType = 'png' | 'svg' | 'pdf';

@Component({
  selector: 'mav-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild('clipboardTarget', { static: false }) clipboardTargetEl: ElementRef;
  @ViewChildren('sidenavFileInputTag') fileInputTags: QueryList<ElementRef>;
  @Input() set panelsOpenState(sidenavOpenState: boolean) {
    if (!sidenavOpenState) {
      this.accordion.closeAll();
    } else {
      this.shareUrl = '';
    }
  }

  exportSnapshotType = null;
  panelOpenState = true;
  projectExtensions: ProjectExtensionType[] = ['yml', 'nsf', 'isi', 'csv'];
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
    public loadProjectService: LoadProjectService,
    public exportService: ExportService,
    private loggingControlService: LoggingControlService,
    private projectSerializer: ProjectSerializerService,
    private getLinkService: GetLinkService,
    private router: Router,
    private clipboardService: ClipboardService,
    public snackBar: MatSnackBar
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
            this.loadProjectService.getProjectFromUrl(projObjId, this.baseUrl, this.removeShareUrlFromAddress);
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

  isValidFileExtension(selectedExtensionOnButton: ProjectExtensionType, fileExtensionFromFile: ProjectExtensionType) {
    return this.loadProjectService.getSupportedExtension(selectedExtensionOnButton).split(',').indexOf('.' + fileExtensionFromFile) !== -1;
  }

  readNewFile(event: any, target: any, selectedExtension: ProjectExtensionType) {
    const filename = get(event, 'srcElement.files[0].name');
    if (!filename) {
      return;
    }
    const fileExtension = filename && filename.split('.').slice(-1).toString().toLowerCase();
    if (this.isValidFileExtension(selectedExtension , fileExtension)) {
      this.loadProjectService.getProject(filename, selectedExtension, event);
    } else {
      // TODO temporary, use logs
      // alert(`${filename} has the wrong extension.`);
      this.snackBar.open(`${filename} has the wrong extension.`, null, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'mav-snackbar-wrapper'
      });
      console.log(`${filename} has the wrong extension.`);
    }
    // clear the values of fileinput tags.
    if (this.fileInputTags) {
      this.fileInputTags.forEach((elementRef: ElementRef) => {
          elementRef.nativeElement.value = null;
      });
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
