import { Component } from '@angular/core';

import { StartLegendComponent as NgxStartComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../../base-visualization-component';

import { createDefaultFieldGroup, createFieldNameMapping } from '../../utility';

export type SizeFields = Pick<
NgxStartComponent,
  'sizeField' | 'idField' | 'categoryField'
>;

export type Properties = null;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: SizeFields
};

const sizeFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'idField',
  'text': 'categoryField',
  'axis': 'sizeField'
});


@Component({
  selector: 'dvl-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent extends BaseVisualizationComponent<Properties, FieldGroups>  {

  readonly defaultProperties = null;
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['sizeField', 'idField', 'categoryField'])
  };

  constructor() {
    super();
   }

  fieldNameFor(key: string, group: string): string {
    return sizeFieldNameMapping[key];
  }
}
