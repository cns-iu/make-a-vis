import { Component } from '@angular/core';
import { NodeSizeLegendComponent as NgxNodeSizeComponent } from '@ngx-dino/legend';
import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';
import { BoundField } from '@ngx-dino/core';

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
  nodes: NodeSizeFields
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
  readonly defaultProperties = {
    title: 'Node Size', encoding: 'Encoding', nodeSizeRange: [5, 15], margin: ''
  };
  readonly defaultFieldGroups = {
    nodes: createDefaultFieldGroup(['nodeIdField', 'nodeSizeField'])
  };
  fieldNameFor(key: string, group: string): string {
    return nodesFieldNameMapping[key];
  }
}
