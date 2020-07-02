import { VisualizationComponent, Visualization } from '@dvl-fw/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dvl-temporal-bargraph',
  templateUrl: './temporal-bargraph.component.html',
  styleUrls: ['./temporal-bargraph.component.scss']
})
export class TemporalBargraphComponent implements OnInit, VisualizationComponent {

  constructor() { }
  data: Visualization;

  ngOnInit() {
  }

}
