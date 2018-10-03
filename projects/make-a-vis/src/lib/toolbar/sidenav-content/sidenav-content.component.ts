import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';

import { Store , select } from '@ngrx/store';
import { SidenavState, SidenavActionTypes, getLoadedProjectSelector } from '../shared/store';
import { ProjectSerializerService, Project } from 'dvl-fw';

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
    private store: Store<SidenavState>, // TODO
    private loadProjectService: LoadProjectService,
    public exportService: ExportService,
    private loggingControlService: LoggingControlService
  ) {
      loggingControlService.disableLogging();

      this.store.pipe(select(getLoadedProjectSelector))
        .subscribe((data: any) => {
          if (data) {
            this.project = data.project;
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
    this.store.dispatch({
      type: SidenavActionTypes.LoadProjectStarted,
      payload: { filename: filename, fileExtension: fileExtension }
    });

    this.loadProjectService.loadFile(fileExtension, event.srcElement.files[0])
      .subscribe((project) => {
      if (project) { // success
        this.store.dispatch({
          type: SidenavActionTypes.LoadProjectCompleted,
          payload: { project: project }
        });
      } else { // failure'
          this.store.dispatch({
            type: SidenavActionTypes.LoadProjectError,
            payload: { errorOccurred: true, errorTitle: 'Load Error', errorMessage: 'Failed to load new project' }
          });
        }
        // close sidenav
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
        ) {
            this.getProject(filename, fileExtension, event);
        } else {
            console.log('File chosen has wrong extension'); // TODO temporary, use logs
          }
    }
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
