import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('mt') matTab: any;
  tabs = [];
  menuOptions = [
    { label: 'Scatter Graph', icon: 'scatterGraph' },
    { label: 'Geomap', icon: 'geomap' },
    { label: 'Map of Science', icon: 'mapOfScience' },
    { label: 'Network', icon: 'network' },
    { label: 'Horizontal Bar Graph', icon: 'hbg' }
  ];
  selectedTab = 0;

  constructor() { }

  ngOnInit() {
  }

  selected(target: number) {
    this.selectedTab = target;
  }

  addTab(label: string) {
    this.tabs.push(label);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
