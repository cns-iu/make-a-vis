import { Component } from '@angular/core';

import { BaseVisualizationComponent } from '../base-visualization-component';

export type Properties = null;
export type FieldGroups = null;
@Component({
  selector: 'dvl-area-size',
  templateUrl: './area-size.component.html',
  styleUrls: ['./area-size.component.css']
})
export class AreaSizeComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups = null;

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return null;
  }
}
