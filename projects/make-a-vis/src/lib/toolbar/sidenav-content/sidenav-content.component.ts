import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { MatAccordion, MatButtonToggleGroup } from '@angular/material';

import { LoadProjectService } from '../shared/services/load-project.service';

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

  constructor(private loadProjectService: LoadProjectService) { }

  ngOnInit() {
  }

  setFileType(event: MatButtonToggleGroup) {
    this.newProjectFileExtension = event.value;
  }

  readNewFile(event: any) { // TODO WIP
    const filename = event.srcElement.files[0].name;
    const fileExtension = filename.split('.').slice(-1).toString();

    if (fileExtension.toString() === this.newProjectFileExtension) {
      const projectObservable = this.loadProjectService.loadFile(this.newProjectFileExtension, event.srcElement.files[0]);
      // TODO update store
    } else if (fileExtension.toString() !== this.newProjectFileExtension) {
        console.log('File chosen has wrong extension'); // TODO temporary
    }
  }
}
