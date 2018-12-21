import { Component } from '@angular/core';

import { BaseVisualizationComponent } from '../../base-visualization-component';

export type Properties = null;
export type FieldGroups = null;
@Component({
  selector: 'dvl-end',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups = null;

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return null;
  }
}

