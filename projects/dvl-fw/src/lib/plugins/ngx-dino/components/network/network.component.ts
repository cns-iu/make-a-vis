// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
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
  'nodeStrokeField' | 'nodeStrokeWidthField' | 'nodeTooltipField' | 'nodeLabelField' |
  'nodeLabelPositionField' | 'nodeTransparencyField' | 'strokeTransparencyField' | 'nodePulseField'
>;

export type EdgeFields = Pick<
  NgxNetworkComponent,
  'edgeIdField' | 'edgeSourceField' | 'edgeTargetField' | 'edgeStrokeField' | 'edgeStrokeWidthField' | 'edgeTransparencyField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  nodes: NodeFields,
  edges: EdgeFields
};

// TODO: strokeWidth, tooltip, label, labelPosition
const nodesFieldNameMapping = createFieldNameMapping([
  'color', 'transparency', 'position', 'label', 'labelPosition', 'tooltip', 'strokeWidth'
], {
  'identifier': 'nodeIdField', 'areaSize': 'nodeSizeField', 'shape': 'nodeSymbolField',
  'strokeColor': 'nodeStrokeField', 'strokeTransparency': 'nodeStrokeTransparencyField'
}, 'node');

const edgesFieldNameMapping = createFieldNameMapping([
  'source', 'target', 'strokeWidth', 'transparency', 'pulse'
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
      'nodeStrokeField', 'nodeStrokeWidthField', 'nodeTooltipField', 'nodeLabelField', 'nodeLabelPositionField',
      'nodeTransparencyField', 'strokeTransparencyField', 'nodePulseField'
    ]),
    edges: createDefaultFieldGroup([
      'edgeIdField', 'edgeSourceField', 'edgeTargetField', 'edgeStrokeField', 'edgeStrokeWidthField', 'edgeTransparencyField'
    ])
  };

  constructor() {
    super();
  }

  fieldNameFor(key: string, group: string): string {
    const mapping = group === 'nodes' ? nodesFieldNameMapping : edgesFieldNameMapping;
    return mapping[key];
  }
}
