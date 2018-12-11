import { Component, OnInit } from '@angular/core';

export interface VisType {
  template: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'mav-selection-visualization-type',
  templateUrl: './visualization-type.component.html',
  styleUrls: ['./visualization-type.component.css']
})
export class VisualizationTypeComponent implements OnInit {
  selected: VisType;
  visTypes: VisType[] = [
    { template: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { template: 'geomap', label: 'Geomap', icon: 'geomap' },
    { template: 'science-map', label: 'Map of Science', icon: 'mapOfScience' },
    { template: 'network', label: 'Network', icon: 'network' },
    { template: 'temporal-bargraph', label: 'Temporal Bar Graph', icon: 'hbg' }
  ];

  constructor() { }

  ngOnInit() {
  }

  visualizationSelected(type: VisType) {
    this.selected = type;
  }
}
