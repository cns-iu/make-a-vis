import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatAccordion } from '@angular/material';
import { SidenavEvent, ExportProjectEvent} from '../shared/events';

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
  @Output() sideNavEvent: EventEmitter<SidenavEvent> = new EventEmitter<SidenavEvent>();


  exportSnapshotType = null;
  panelOpenState = true;
  exportProjectEvent: ExportProjectEvent;


  constructor() { }

  ngOnInit() {
  }

  exportSnapshot() {
    const event  = {} as ExportProjectEvent;
    event.type = 'export';
    event.imageFormat = this.exportSnapshotType;
    this.sideNavEvent.emit(event);

  }
}
