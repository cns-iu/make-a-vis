import { Component } from '@angular/core';
import { NetworkComponent as NgxNetworkComponent } from '@ngx-dino/network';
import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxNetworkComponent,
  'coordinateSpace'
>;

export type NodeFields = Pick<
  NgxNetworkComponent,
  'nodeIdField' | 'nodePositionField' | 'nodeSizeField' | 'nodeSymbolField' | 'nodeColorField' |
  'nodeStrokeField' | 'nodeStrokeWidthField' | 'nodeTooltipField' | 'nodeLabelField' | 'nodeLabelPositionField'
>;

export type EdgeFields = Pick<
  NgxNetworkComponent,
  'edgeIdField' | 'edgeSourceField' | 'edgeTargetField' | 'edgeStrokeField' | 'edgeStrokeWidthField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  nodes: NodeFields,
  edges: EdgeFields
};

// TODO: strokeWidth, tooltip, label, labelPosition
const nodesFieldNameMapping = createFieldNameMapping([
  'color', 'position'
], {
  'identifier': 'nodeIdField', 'areaSize': 'nodeSizeField', 'shape': 'nodeSymbolField',
  'strokeColor': 'nodeStrokeField'
}, 'node');

// TODO: sourcePosition, targetPosition, strokeWidth
const edgesFieldNameMapping = createFieldNameMapping([
], {
  'identifier': 'edgeIdField', 'strokeColor': 'edgeStrokeField'
}, 'edge');

@Component({
  selector: 'dvl-vis-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    coordinateSpace: undefined
  };

  readonly defaultFieldGroups: FieldGroups = {
    nodes: createDefaultFieldGroup([
      'nodeIdField', 'nodePositionField', 'nodeSizeField', 'nodeSymbolField', 'nodeColorField',
      'nodeStrokeField', 'nodeStrokeWidthField', 'nodeTooltipField', 'nodeLabelField', 'nodeLabelPositionField'
    ]),
    edges: createDefaultFieldGroup([
      'edgeIdField', 'edgeSourceField', 'edgeTargetField', 'edgeStrokeField', 'edgeStrokeWidthField'
    ])
  };

  fieldNameFor(key: string, group: string): string {
    const mapping = group === 'nodes' ? nodesFieldNameMapping : edgesFieldNameMapping;
    return mapping[key];
  }
}
