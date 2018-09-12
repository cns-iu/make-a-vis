import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { BoundField, RawChangeSet } from '@ngx-dino/core';

import { Observable } from 'rxjs';

import {
  pointIdField,

  xField,
  yField,

  sizeField,
  shapeField,
  colorField,
  strokeField,
  tooltipTextField,
  pulseField
} from '../shared/scatterplot/scatterplot-fields';
import { ScatterplotDataService } from '../shared/scatterplot/scatterplot-data.service';

@Component({
  selector: 'mav-app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ScatterplotDataService]
})
export class ScatterplotComponent implements OnInit, DoCheck {
  @Input() height = 70 / 100 * window.innerHeight;
  @Input() width = 65 / 100 * window.innerWidth;
  @ViewChild('scatterplot') scatterplot: any;

  data: Observable<RawChangeSet<any>>;

  id: BoundField<string>;

  x: BoundField<number>;
  y: BoundField<number>;

  color: BoundField<string>;
  shape: BoundField<string>;
  size: BoundField<number>;
  stroke: BoundField<string>;

  pulse: BoundField<boolean>;

  tooltipText: BoundField<number | string>;
  enableTooltip = true;

  constructor(private dataService: ScatterplotDataService) {
    this.data = this.dataService.data;
  }

  ngOnInit() {
    this.id = pointIdField.getBoundField();

    this.x = xField.getBoundField();
    this.y = yField.getBoundField();

    this.shape = shapeField.getBoundField();
    this.size = sizeField.getBoundField();
    this.color = colorField.getBoundField();
    this.stroke = strokeField.getBoundField();

    this.pulse = pulseField.getBoundField();

    this.tooltipText = tooltipTextField.getBoundField();
  }

  ngDoCheck() {

    this.scatterplot.resizeSelf();
  }

  // activate(): void {
  //   this.scatterplot.resizeSelf();
  // }
}
