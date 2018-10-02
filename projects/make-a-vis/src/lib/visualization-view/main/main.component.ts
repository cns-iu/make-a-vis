import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';

import { ExportService } from '../../shared/services/export/export.service';

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('visualization') visualization: MatTabGroup;

  tabs = [];
  menuOptions = [
    { label: 'Scatter Graph', icon: 'scatterGraph' },
    { label: 'Geomap', icon: 'geomap' },
    { label: 'Map of Science', icon: 'mapOfScience' },
    { label: 'Network', icon: 'network' },
    { label: 'Horizontal Bar Graph', icon: 'hbg' }
  ];
  selectedTab = 0;

  constructor(private exportService: ExportService) { }

  ngOnInit() {
  }

  selected(target: number) {
    this.selectedTab = this.exportService.selectedTab = target;
    this.exportService.visualizationElement = this.visualization;
  }

  addTab(label: string) {
    this.exportService.visualizationElement = this.visualization;
    this.tabs.push(label);
    this.selected(this.tabs.length - 1);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.tabs && this.tabs.length === 0) {
      this.exportService.visualizationElement = null;
    }
  }
}
