// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { ScatterplotComponent as NgxScatterplotComponent } from '@ngx-dino/scatterplot';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxScatterplotComponent,
  'enableTooltip' | 'xAxisArrow' | 'yAxisArrow' | 'gridlines' | 'gridlinesColor' |
  'gridlinesOpacity' | 'tickLabelColor' | 'showAxisIndicators' | 'showAxisLabels'
>;

export type PointFields = Pick<
  NgxScatterplotComponent,
  'pointIdField' | 'strokeColorField' | 'xField' | 'yField' |
  'colorField' | 'transparencyField' | 'strokeTransparencyField' | 'shapeField' | 'sizeField' | 'pulseField' | 'tooltipTextField'
>;

export type FieldGroups = { points: PointFields }; // tslint:disable-line:interface-over-type-literal

const fieldNameMapping = createFieldNameMapping([
  'x', 'y', 'shape', 'color', 'strokeColor', 'transparency', 'strokeTransparency'
], {
  'identifier': 'pointIdField', 'areaSize': 'sizeField'
});

@Component({
  selector: 'dvl-vis-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    enableTooltip: false, xAxisArrow: true, yAxisArrow: true,
    gridlines: false, gridlinesColor: 'lightgrey', gridlinesOpacity: 0.7,
    tickLabelColor: 'lightblack', showAxisIndicators: false, showAxisLabels: false,
  };

  readonly defaultFieldGroups: FieldGroups = {
    points: createDefaultFieldGroup([
      'pointIdField', 'strokeColorField', 'xField', 'yField', 'colorField', 'transparencyField', 'strokeTransparencyField',
      'shapeField', 'sizeField', 'pulseField', 'tooltipTextField'
    ])
  };

  fieldNameFor(key: string, group: string): string {
    return fieldNameMapping[key];
  }
}
