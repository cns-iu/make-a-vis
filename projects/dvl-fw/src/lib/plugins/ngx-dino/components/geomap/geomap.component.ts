// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { GeomapComponent as NgxGeomapComponent } from '@ngx-dino/geomap';
import { geoAlbersUsa, geoMercator } from 'd3-geo';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxGeomapComponent,
  'basemapZoomLevels' | 'basemapSelectedZoomLevel' | 'basemapDefaultColor' |
  'basemapDefaultTransparency' | 'basemapDefaultStrokeColor' | 'basemapDefaultStrokeWidth' |
  'basemapDefaultStrokeDashArray' | 'basemapDefaultStrokeTransparency'
>;

export type BasemapFields = Pick<
  NgxGeomapComponent,
  'basemapColorField' | 'basemapTransparencyField' | 'basemapStrokeColorField' |
  'basemapStrokeWidthField' | 'basemapStrokeDashArrayField' | 'basemapStrokeTransparencyField'
>;

export type NodeFields = Pick<
  NgxGeomapComponent,
  'nodeIdField' | 'nodePositionField' | 'nodeSizeField' | 'nodeSymbolField' |
  'nodeColorField' | 'nodeStrokeColorField' | 'nodeStrokeWidthField' | 'nodeTooltipField' |
  'nodeLabelField' | 'nodeLabelPositionField' | 'nodeTransparencyField' | 'nodeStrokeTransparencyField' |
  'nodePulseField'
>;

export type EdgeFields = Pick<
  NgxGeomapComponent,
  'edgeIdField' | 'edgeSourceField' | 'edgeTargetField' | 'edgeStrokeColorField' | 'edgeStrokeWidthField' | 'edgeTransparencyField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  basemap: BasemapFields,
  nodes: NodeFields,
  edges: EdgeFields
};

// TODO: strokeDashArray
const basemapFieldNameMapping = createFieldNameMapping([
  'color', 'transparency', 'strokeColor', 'strokeWidth', 'strokeTransparency'
], {
}, 'basemap');

// TODO: tooltip, label, labelPosition
const nodesFieldNameMapping = createFieldNameMapping([
  'color', 'transparency', 'label', 'labelPosition', 'tooltip', 'strokeWidth'
], {
  'identifier': 'nodeIdField', 'areaSize': 'nodeSizeField', 'shape': 'nodeSymbolField',
  'strokeColor': 'nodeStrokeField', 'strokeTransparency': 'nodeStrokeTransparencyField',
  'latlng': 'nodePositionField'
}, 'node');

const edgesFieldNameMapping = createFieldNameMapping([
  'strokeWidth', 'transparency', 'pulse'
], {
  'identifier': 'edgeIdField', 'strokeColor': 'edgeStrokeColorField',
  'latlng1': 'edgeSourceField', 'latlng2': 'edgeTargetField'
}, 'edge');

const fieldNameMappingMap = {
  basemap: basemapFieldNameMapping,
  nodes: nodesFieldNameMapping,
  edges: edgesFieldNameMapping
};

@Component({
  selector: 'dvl-vis-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    basemapZoomLevels: undefined, basemapSelectedZoomLevel: undefined,
    basemapDefaultColor: undefined, basemapDefaultTransparency: undefined,
    basemapDefaultStrokeColor: undefined, basemapDefaultStrokeWidth: undefined,
    basemapDefaultStrokeDashArray: undefined, basemapDefaultStrokeTransparency: undefined
  };

  readonly defaultFieldGroups: FieldGroups = {
    basemap: createDefaultFieldGroup([
      'basemapColorField', 'basemapTransparencyField', 'basemapStrokeColorField',
      'basemapStrokeWidthField', 'basemapStrokeDashArrayField', 'basemapStrokeTransparencyField'
    ]),
    nodes: createDefaultFieldGroup([
      'nodeIdField', 'nodePositionField', 'nodeSizeField', 'nodeSymbolField',
      'nodeColorField', 'nodeStrokeColorField', 'nodeStrokeWidthField', 'nodeTooltipField',
      'nodeLabelField', 'nodeLabelPositionField', 'nodeTransparencyField', 'nodeStrokeTransparencyField',
      'nodePulseField'
    ]),
    edges: createDefaultFieldGroup([
      'edgeIdField', 'edgeSourceField', 'edgeTargetField', 'edgeStrokeColorField', 'edgeStrokeWidthField', 'edgeTransparencyField'
    ])
  };

  fieldNameFor(key: string, group: string): string {
    return fieldNameMappingMap[group][key];
  }
}
