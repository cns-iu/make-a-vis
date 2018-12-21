// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { GeomapComponent as NgxGeomapComponent } from '@ngx-dino/geomap';

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
  'nodeIdField' | 'nodePositionField' | 'nodeLatitudeField' | 'nodeLongitudeField' |
  'nodeSizeField' | 'nodeSymbolField' | 'nodeColorField' | 'nodeStrokeColorField' |
  'nodeStrokeWidthField' | 'nodeTooltipField' | 'nodeLabelField' | 'nodeLabelPositionField' |
  'nodeTransparencyField' | 'nodeStrokeTransparencyField' | 'nodePulseField'
>;

export type EdgeFields = Pick<
  NgxGeomapComponent,
  'edgeIdField' | 'edgeSourceField' | 'edgeSourceLatitudeField' | 'edgeSourceLongitudeField' |
  'edgeTargetField' | 'edgeTargetLatitudeField' | 'edgeTargetLongitudeField' |
  'edgeStrokeColorField' | 'edgeStrokeWidthField' | 'edgeTransparencyField'
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
  'latitude', 'longitude', 'color', 'transparency',
  'label', 'labelPosition', 'tooltip', 'strokeWidth'
], {
  'identifier': 'nodeIdField', 'areaSize': 'nodeSizeField', 'shape': 'nodeSymbolField',
  'strokeColor': 'nodeStrokeField', 'strokeTransparency': 'nodeStrokeTransparencyField',
  'latlng': 'nodePositionField'
}, 'node');

const edgesFieldNameMapping = createFieldNameMapping([
  'strokeWidth', 'transparency', 'pulse'
], {
  'identifier': 'edgeIdField', 'strokeColor': 'edgeStrokeColorField',
  'latlng1': 'edgeSourceField', 'latlng2': 'edgeTargetField',
  'latitude1': 'edgeSourceLatitudeField', 'longitude1': 'edgeSourceLongitudeField',
  'latitude2': 'edgeTargetLatitudeField', 'longitude2': 'edgeTargetLongitudeField'
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
    basemapZoomLevels: undefined, basemapSelectedZoomLevel: 1,
    basemapDefaultColor: 'white', basemapDefaultTransparency: undefined,
    basemapDefaultStrokeColor: '#bebebe', basemapDefaultStrokeWidth: undefined,
    basemapDefaultStrokeDashArray: undefined, basemapDefaultStrokeTransparency: undefined
  };

  readonly defaultFieldGroups: FieldGroups = {
    basemap: createDefaultFieldGroup([
      'basemapColorField', 'basemapTransparencyField', 'basemapStrokeColorField',
      'basemapStrokeWidthField', 'basemapStrokeDashArrayField', 'basemapStrokeTransparencyField'
    ]),
    nodes: createDefaultFieldGroup([
      'nodeIdField', 'nodePositionField', 'nodeLatitudeField', 'nodeLongitudeField',
      'nodeSizeField', 'nodeSymbolField', 'nodeColorField', 'nodeStrokeColorField',
      'nodeStrokeWidthField', 'nodeTooltipField', 'nodeLabelField', 'nodeLabelPositionField',
      'nodeTransparencyField', 'nodeStrokeTransparencyField', 'nodePulseField'
    ]),
    edges: createDefaultFieldGroup([
      'edgeIdField', 'edgeSourceField', 'edgeSourceLatitudeField', 'edgeSourceLongitudeField',
      'edgeTargetField', 'edgeTargetLatitudeField', 'edgeTargetLongitudeField',
      'edgeStrokeColorField', 'edgeStrokeWidthField', 'edgeTransparencyField'
    ])
  };

  fieldNameFor(key: string, group: string): string {
    return fieldNameMappingMap[group][key];
  }
}
