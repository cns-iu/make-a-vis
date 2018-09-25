import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';

import { MatAccordion, MatButtonToggleGroup } from '@angular/material';

import { Store, select } from '@ngrx/store';

import { SidenavState, SidenavActionTypes, getLoadedProject } from '../shared/store';

import { LoadProjectService } from '../shared/services/load-project.service';
import { ExportService } from '../../shared/services/export/export.service';

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
  newProjectFileExtension: 'isi' | 'nsf' | 'csv' | 'json';

  constructor(
    private loadProjectService: LoadProjectService,
    public exportService: ExportService
    private store: Store<SidenavState>
  ) { }

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

  readNewFile(event: any) {
    const filename = event.srcElement.files[0].name;
    const fileExtension = filename.split('.').slice(-1).toString();

    if (fileExtension.toString() === this.newProjectFileExtension) {
      this.store.dispatch({
        type: SidenavActionTypes.LoadProjectStarted,
        payload: { filename: filename, fileExtension: fileExtension }
      });

      this.loadProjectService.loadFile(this.newProjectFileExtension, event.srcElement.files[0])
        .subscribe((project) => {
        if (project) { // success
          this.store.dispatch({
            type: SidenavActionTypes.LoadProjectCompleted,
            payload: { project: project }
          });
        } else { // failure
            this.store.dispatch({
              type: SidenavActionTypes.LoadProjectError,
              payload: { errorOccurred: true, errorTitle: 'Load Error', errorMessage: 'Failed to load new project' }
            });
          }
      });
    } else if (fileExtension.toString() !== this.newProjectFileExtension) {
        console.log('File chosen has wrong extension'); // TODO temporary
      }
  }
}
