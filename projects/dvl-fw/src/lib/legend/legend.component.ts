import { Component, Input, OnInit } from '@angular/core';

import { Visualization } from '../shared/visualization';

export type LegendType = 'dynamic-only' | 'static-only' | 'dynamic-preferred' | 'static-preferred';
export type LegendOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'dvl-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  @Input() visualization: Visualization;
  @Input() symbolGroups: string | string[] = undefined;
  @Input() type: LegendType = 'dynamic-preferred';
  @Input() orientation: LegendOrientation = 'horizontal';

  constructor() { }

  ngOnInit() {
  }

}
