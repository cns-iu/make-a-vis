import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css']
})
export class SidenavContentComponent implements OnInit {
  panelOpenState = true;

  constructor() { }

  ngOnInit() {
  }
}
