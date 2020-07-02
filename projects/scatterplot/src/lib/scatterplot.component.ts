import { VisualizationComponent, Visualization } from '@dvl-fw/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dvl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit, VisualizationComponent {

  constructor() { }
  data: Visualization;

  ngOnInit() {
  }

}
