import { Component } from '@angular/core';

import { BaseVisualizationComponent } from '../../base-visualization-component';

export type Properties = null;
export type FieldGroups = null;
@Component({
  selector: 'dvl-y-axis',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.css']
})
export class YAxisComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups = null;

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return null;
  }
}
