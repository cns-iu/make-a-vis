import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';

import { NewProjectService } from '../shared/services/new-project.service';
import {SaveProjectService } from '../shared/services/save-project/save-project.service';
import { Store } from '@ngrx/store';
import { SidenavState, SidenavActionTypes } from '../shared/store';
import { ProjectSerializerService } from 'dvl-fw';


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

  panelOpenState = true;
  newProjectFileExtension: 'isi' | 'nsf' | 'csv' | 'json';

  constructor(
    private newProjectService: NewProjectService, private projectSerializerService: ProjectSerializerService,
    private saveProjectService: SaveProjectService,
    private store: Store<SidenavState> // TODO
  ) { }

  ngOnInit() {
  }

  setFileType(event: MatButtonToggleGroup) {
    this.newProjectFileExtension = event.value;
  }

  readNewFile(event: any) { // TODO WIP
    const filename = event.srcElement.files[0].name;
    const fileExtension = filename.split('.')[1];

    if (fileExtension.toString() === this.newProjectFileExtension) {
      this.store.dispatch({ type: SidenavActionTypes.LoadProjectStarted }); // TODO WIP
      this.newProjectService.readFile(this.newProjectFileExtension, event.srcElement.files[0]);
      this.store.dispatch({type: SidenavActionTypes.LoadProjectCompleted}); // TODO WIP
    } else if (fileExtension.toString() !== this.newProjectFileExtension) {
        this.openSnackbar('File chosen has wrong extension'); // TODO temporary
    }
  }

  openSnackbar(message: string) { // TODO temporary
    console.log(message);
  }

  saveProject() {
    const p = this.newProjectService.project;
    this.saveProjectService.save(p).subscribe((k) => {
      console.log(k);
    });
  }
}
