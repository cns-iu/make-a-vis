import { Component } from '@angular/core';
import { BoundLegendComponent as NgxBoundComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = null;

export type SizeFields = Pick<
  NgxBoundComponent,
  'idField' | 'valueField' | 'inputField' | 'labelField' | 'orderField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: SizeFields
};

const sizeFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'idField',
  'axis': 'valueField',
  'input': 'inputField',
  'label': 'labelField',
  'order': 'orderField'
});


@Component({
  selector: 'dvl-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['idField', 'valueField', 'inputField', 'labelField', 'orderField'])
  };

  constructor() {
    super();
  }

  fieldNameFor(key: string, group: string): string {
    return sizeFieldNameMapping[key];
  }
}
