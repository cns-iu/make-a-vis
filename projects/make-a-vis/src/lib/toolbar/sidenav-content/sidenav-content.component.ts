import { Component, OnInit, Input, ViewChild, Inject  } from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';
import { Store , select } from '@ngrx/store';
import * as sidenavStore from '../shared/store';
import { DOCUMENT } from '@angular/platform-browser';
import { Project, ProjectSerializerService } from 'dvl-fw';

import { get } from 'lodash';

import { SaveProjectService } from '../shared/services/save-project/save-project.service';
import { LoadProjectService } from '../shared/services/load-project.service';
import { LoggingControlService } from '../../shared/logging-control.service';
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
  shareUrlFieldDisabled : boolean;
  private baseUrl : string;
  shareUrl : string = "";

  constructor(
    private saveProjectService: SaveProjectService,
    private store: Store<sidenavStore.SidenavState>,
    private loadProjectService: LoadProjectService,
    public exportService: ExportService,
    private loggingControlService: LoggingControlService,
    private projectSerializer : ProjectSerializerService,
    private getLinkService : GetLinkService,
    @Inject(DOCUMENT) document: any
  ) {
      this.baseUrl = document.location.origin;
      loggingControlService.disableLogging();
      this.shareUrlFieldDisabled = false;
      this.baseUrl= document.location.origin;
      this.store.pipe(select(sidenavStore.getLoadedProjectSelector))
        .subscribe((project: Project) => {
          if (project) {
            this.project = project;
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


  getProject(filename: string, fileExtension: NewProjectExtensionType | LoadProjectExtensionType, event: any ) {
    this.store.dispatch(new sidenavStore.LoadProjectStarted({ loadingProject: true, filename: filename, fileExtension: fileExtension }));

    this.loadProjectService.loadFile(fileExtension, event.srcElement.files[0])
      .subscribe((project) => {
      if (project) { // success
        this.store.dispatch(new sidenavStore.LoadProjectCompleted(
          { loadingProject: false, incomingDataFile: filename, incomingDataFileType: fileExtension, project: project }
        ));
      } else { // failure
          this.store.dispatch(new sidenavStore.LoadProjectError(
            { errorOccurred: true, errorTitle: 'Load Error', errorMessage: 'Failed to load new project' }
          ));
        }
    });
  }

  readNewFile(event: any, isLoadProject: boolean) {
    const filename = get(event, 'srcElement.files[0].name');
    const fileExtension = filename && filename.split('.').slice(-1).toString();

    if (filename && fileExtension) {
      if (isLoadProject && this.loadProjectExtensions.indexOf(fileExtension) !== -1) {
        this.getProject(filename, fileExtension, event);
      } else if (
          !isLoadProject
          && this.newProjectExtensions.indexOf(this.newProjectFileExtension) !== -1
          && fileExtension === this.newProjectFileExtension
        ) { this.getProject(filename, fileExtension, event);
        } else {
            console.log('File chosen has wrong extension'); // TODO temporary, use logs
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
    let stateObs = this.store.pipe(select(sidenavStore.getLoadedProjectSelector))
        .subscribe((prj: Project) => {
          if (prj) {
            this.projectSerializer.toJSON(prj).subscribe(
              prj_json => {
                this.getLinkService.getJSONobjId(prj_json).subscribe(
                  object_id => {
                    /* {'id' : 'someid'} */
                    console.log("here");
                    console.log(object_id);
                    this.shareUrl =  this.baseUrl + '/make-a-vis?share='+object_id['id'];
                    this.shareUrlFieldDisabled = false;
                    /* dispatch an action stating create url has completed */
                    this.store.dispatch(new sidenavStore.CreateShareUrlCompleted({
                      'shareUrl' : null,
                      'creatingShareUrl' : false,
                      'project' : prj
                    }));
                  }, err => {
                    this.shareUrlFieldDisabled = false;
                    this.store.dispatch(new sidenavStore.CreateShareUrlError({
                      'errorOccurred' : true,
                      'errorTitle' : err.name,
                      'errorMessage' : err.message
                    }));
                  });

              },
              /* dispatch an action stating create url has thrown an error */
              err => {this.shareUrlFieldDisabled = false;
                this.store.dispatch(new sidenavStore.CreateShareUrlError({
                'errorOccurred' : true,
                'errorTitle' : err.name,
                'errorMessage' : err.message
              }));})
          }
          else {
            this.shareUrlFieldDisabled = false;
            this.store.dispatch(new sidenavStore.CreateShareUrlError({
              'errorOccurred' : true,
              'errorTitle' : 'Project state not found',
              'errorMessage' : 'Looks like you have no active projects openened'
            }));
            console.error("getUrlLink()","could not get Project state from store");
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
  }
}
