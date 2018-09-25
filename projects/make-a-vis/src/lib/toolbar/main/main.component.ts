import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isSidenavOpen = false;

  constructor() { }

  ngOnInit() {
  }

  setSidenavState(event: boolean) {
    this.isSidenavOpen = event;
  }
}
