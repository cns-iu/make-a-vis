// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { NodeSizeLegendComponent as NgxNodeSizeComponent } from '@ngx-dino/legend';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxNodeSizeComponent,
  'title' | 'encoding' | 'nodeSizeRange' | 'margin'
>;

export type NodeSizeFields = Pick<
  NgxNodeSizeComponent,
  'nodeSizeField' | 'nodeIdField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: NodeSizeFields
};

const nodesFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'nodeIdField', 'areaSize': 'nodeSizeField'
});


@Component({
  selector: 'dvl-vis-node-size',
  templateUrl: './node-size.component.html',
  styleUrls: ['./node-size.component.css']
})
export class NodeSizeComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    title: '', encoding: '', nodeSizeRange: [5, 15], margin: ''
  };
  readonly defaultFieldGroups: FieldGroups = {
    items: createDefaultFieldGroup(['nodeIdField', 'nodeSizeField'])
  };
  fieldNameFor(key: string, group: string): string {
    return nodesFieldNameMapping[key];
  }
}
