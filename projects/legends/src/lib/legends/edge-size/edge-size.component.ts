import { Component } from '@angular/core';
import { StrokeWidthLegendComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = null;

export type EdgeSizeFields = Pick<
StrokeWidthLegendComponent,
  'idField' | 'strokeWidthField' | 'inputField' | 'labelField' | 'orderField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: EdgeSizeFields
};

const edgesFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'idField',
  'strokeWidth': 'strokeWidthField',
  'input': 'inputField',
  'label': 'labelField',
  'order': 'orderField'
});


@Component({
  selector: 'dvl-vis-edge-size',
  templateUrl: './edge-size.component.html',
  styleUrls: ['./edge-size.component.css']
})
export class EdgeSizeComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = null;
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['idField', 'strokeWidthField', 'inputField', 'labelField', 'orderField'])
  };
  fieldNameFor(key: string, group: string): string {
    return edgesFieldNameMapping[key];
  }
}
