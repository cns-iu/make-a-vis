import { Component, Input, OnInit } from '@angular/core';

import { VisualizationComponent } from './../../../../shared/visualization-component';
import { Visualization } from './../../../../shared/visualization';


@Component({
  selector: 'dvl-vis-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements VisualizationComponent, OnInit {
  @Input() data: Visualization;

  constructor() { }

  ngOnInit() { }
}
