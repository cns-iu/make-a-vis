// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { ColorLegendComponent as NgxColorComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxColorComponent,
  'colorMapping' | 'legendType' | 'title' | 'encoding' | 'colorRange' | 'margin'
>;

export type ColorFields = Pick<
  NgxColorComponent,
  'colorField' | 'idField' | 'categoryField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: ColorFields
};

const colorFieldNameMapping = createFieldNameMapping([
  'color'
], {
  'identifier': 'idField',
  'text': 'categoryField'
});


@Component({
  selector: 'dvl-vis-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    colorMapping: [], legendType: '', title: '', encoding: '', colorRange: '', margin: ''
  };
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['colorField', 'idField', 'categoryField'])
  };
  fieldNameFor(key: string, group: string): string {
    return colorFieldNameMapping[key];
  }
}
