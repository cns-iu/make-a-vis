import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-selection-visualization-type',
  templateUrl: './visualization-type.component.html',
  styleUrls: ['./visualization-type.component.css']
})
export class VisualizationTypeComponent implements OnInit {

  visualizationTypes = [
    'Scatter Graph',
    'Temporal Bar Graph',
    'Geomap',
    'Science Map'
  ]; // TODO: temporary

  constructor() { }

  ngOnInit() {
  }

}
