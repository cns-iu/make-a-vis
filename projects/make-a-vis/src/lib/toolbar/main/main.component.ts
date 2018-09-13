import { Component, OnInit, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { SidenavEvent } from '../shared/events';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('scatterplot') scatterplot: ElementRef;

  isSidenavOpen = false;

  constructor() { }

  ngOnInit() {
  }

  setSidenavState(event: boolean) {
    this.isSidenavOpen = event;
  }
}

