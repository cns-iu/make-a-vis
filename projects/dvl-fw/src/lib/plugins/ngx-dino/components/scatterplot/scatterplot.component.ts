import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { VisualizationComponent, OnPropertyChange, OnGraphicSymbolChange } from './../../../../shared/visualization-component';
import { Visualization } from './../../../../shared/visualization';


@Component({
  selector: 'dvl-vis-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements VisualizationComponent, OnInit, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;

  constructor() { }

  ngOnInit() { }

  dvlOnPropertyChange(changes: SimpleChanges): void {
    // TODO
  }

  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    // TODO
  }
}
