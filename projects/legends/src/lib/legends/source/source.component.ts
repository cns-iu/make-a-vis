import { Component } from '@angular/core';

import { BaseVisualizationComponent } from '../base-visualization-component';

export type Properties = null;
export type FieldGroups = null;
@Component({
  selector: 'dvl-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups = null;

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return null;
  }
}
