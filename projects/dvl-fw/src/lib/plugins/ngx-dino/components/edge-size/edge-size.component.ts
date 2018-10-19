import { Component } from '@angular/core';
import { EdgeSizeLegendComponent as NgxEdgeSizeComponent } from '@ngx-dino/legend';
import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxEdgeSizeComponent,
  'title' | 'encoding' | 'edgeSizeRange' | 'margin'
>;

export type EdgeSizeFields = Pick<
  NgxEdgeSizeComponent,
  'edgeSizeField' | 'edgeIdField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  items: EdgeSizeFields
};

const edgesFieldNameMapping = createFieldNameMapping([], {
  'identifier': 'edgeIdField', 'strokeWidth': 'edgeSizeField'
});


@Component({
  selector: 'dvl-vis-edge-size',
  templateUrl: './edge-size.component.html',
  styleUrls: ['./edge-size.component.css']
})
export class EdgeSizeComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = {
    title: '', encoding: '', edgeSizeRange: [5, 15], margin: ''
  };
  readonly defaultFieldGroups = {
    items: createDefaultFieldGroup(['edgeIdField', 'edgeSizeField'])
  };
  fieldNameFor(key: string, group: string): string {
    return edgesFieldNameMapping[key];
  }
}
