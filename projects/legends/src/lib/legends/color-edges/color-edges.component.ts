import { Component } from '@angular/core';

import { BaseVisualizationComponent } from '../base-visualization-component';

export type Properties = null;
export type FieldGroups = null;
@Component({
  selector: 'dvl-color-edges',
  templateUrl: './color-edges.component.html',
  styleUrls: ['./color-edges.component.css']
})
export class ColorEdgesComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups = null;

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return null;
  }
}
