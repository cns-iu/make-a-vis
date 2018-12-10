import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-selection',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  openMavSideNav = false;

  constructor() { }

  ngOnInit() {
  }

  toggleAddVis(state: boolean) {
    this.openMavSideNav = state;
  }
}
