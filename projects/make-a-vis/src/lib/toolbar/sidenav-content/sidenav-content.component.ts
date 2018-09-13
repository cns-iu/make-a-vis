import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { MatAccordion } from '@angular/material';
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

  constructor(public exportService: ExportService) {

   }

  ngOnInit() {
  }

  exportSnapshot() {
     this.exportService.exportToPng();
  }
}
