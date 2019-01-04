// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { AreaSizeLegendComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = null;

export type NodeSizeFields = Pick<
  AreaSizeLegendComponent,
  'idField' | 'areaSizeField' | 'inputField' | 'labelField' | 'orderField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: NodeSizeFields
};

const nodesFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'idField',
  'areaSize': 'areaSizeField',
  'input': 'inputField',
  'label': 'labelField',
  'order': 'orderField'
});


@Component({
  selector: 'dvl-vis-node-size',
  templateUrl: './node-size.component.html',
  styleUrls: ['./node-size.component.css']
})
export class NodeSizeComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = null;
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['idField', 'areaSizeField', 'inputField', 'labelField', 'orderField'])
  };
  fieldNameFor(key: string, group: string): string {
    return nodesFieldNameMapping[key];
  }
}
