import { Component } from '@angular/core';
import { BaseVisualizationComponent } from '../base-visualization-component';

export type Properties = any;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {};

@Component({
  selector: 'dvl-temporal-bargraph',
  templateUrl: './temporal-bargraph.component.html',
  styleUrls: ['./temporal-bargraph.component.css']
})
export class TemporalBargraphComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = {};
  readonly defaultFieldGroups = {};
  fieldNameFor(key: string, group: string): string {
    return key;
  }
}
