import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';

import { Store , select } from '@ngrx/store';
import * as sidenavStore from '../shared/store';

import { Project, ProjectSerializerService } from 'dvl-fw';

import { get } from 'lodash';

import { SaveProjectService } from '../shared/services/save-project/save-project.service';
import { LoadProjectService } from '../shared/services/load-project.service';
import { LoggingControlService } from '../../shared/logging-control.service';
import { ExportService } from '../../shared/services/export/export.service';

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

  constructor(
    private saveProjectService: SaveProjectService,
    private store: Store<sidenavStore.SidenavState>,
    private loadProjectService: LoadProjectService,
    public exportService: ExportService,
    private loggingControlService: LoggingControlService,
    private projectSerializer : ProjectSerializerService
  ) {
      loggingControlService.disableLogging();

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

  getUrlLink() : string {
    this.store.dispatch(new sidenavStore.CreateShareUrlStarted(true));
    this.store.pipe(select(sidenavStore.getLoadedProjectSelector))
        .subscribe((prj: Project) => {
          if (prj) {
            this.store.dispatch(new sidenavStore.CreateShareUrlCompleted({
              'shareUrl' : null,
              'creatingShareUrl' : false,
              'project' : prj
            }));
            this.projectSerializer.toJSON(prj).subscribe(
              result => {console.log(result)},
              err => {this.store.dispatch(new sidenavStore.CreateShareUrlError({
                'errorOccurred' : true,
                'errorTitle' : err.name,
                'errorMessage' : err.message
              }));})
          }
          else {
            console.error("getUrlLink()","could not get Project state from store");
          }
          
      });
    return null
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
