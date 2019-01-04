// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { ColorHueLegendComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = null;

export type ColorFields = Pick<
  ColorHueLegendComponent,
  'idField' | 'colorField' | 'inputField' | 'labelField' | 'orderField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: ColorFields
};

const colorFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'idField',
  'color': 'colorField',
  'input': 'inputField',
  'label': 'labelField',
  'order': 'orderField'
});


@Component({
  selector: 'dvl-vis-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = null;
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['idField', 'colorField', 'inputField', 'labelField', 'orderField'])
  };
  fieldNameFor(key: string, group: string): string {
    return colorFieldNameMapping[key];
  }
}
