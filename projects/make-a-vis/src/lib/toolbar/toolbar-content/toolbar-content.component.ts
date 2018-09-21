import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mav-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.css']
})
export class ToolbarContentComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  isSidenavOpen = false;

  constructor() { }

  ngOnInit() {
  }

  menuIconClicked(event: Event) {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.toggleSidenav.emit(this.isSidenavOpen);
  }
}
