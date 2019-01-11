// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';

import { TemporalBargraphComponent as NgxTemporalBargraphComponent } from '@ngx-dino/temporal-bargraph';
import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxTemporalBargraphComponent,
  'defaultBarWeight' | 'defaultBarColor' | 'defaultBarTransparency' |
  'defaultBarStrokeColor' | 'defaultBarStrokeWidth' | 'defaultBarStrokeTransparency' |
  'defaultBarLabel' | 'defaultBarLabelPosition' | 'defaultBarTooltip' |
  'barSpacing' | 'barLabelMaxLength'
>;

export type BarFields = Pick<
  NgxTemporalBargraphComponent,
  'barIdField' | 'barStartField' | 'barEndField' | 'barWeightField' |
  'barStackOrderField' | 'barColorField' | 'barTransparencyField' |
  'barStrokeColorField' | 'barStrokeWidthField' | 'barStrokeTransparencyField' |
  'barLabelField' | 'barLabelPositionField' | 'barTooltipField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  bars: BarFields
};

const barsFieldNameMapping = createFieldNameMapping([
  'color', 'transparency', 'strokeColor', 'strokeWidth', 'strokeTransparency',
  'label', 'labelPosition', 'tooltip'
], {
  'identifier': 'barIdField', 'x-start': 'barStartField', 'x-end': 'barEndField',
  'height': 'barWeightField', 'y-order': 'barStackOrderField'
}, 'bar');

@Component({
  selector: 'dvl-vis-temporal-bargraph',
  templateUrl: './temporal-bargraph.component.html',
  styleUrls: ['./temporal-bargraph.component.scss']
})
export class TemporalBargraphComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties = {
    defaultBarWeight: undefined, defaultBarColor: undefined, defaultBarTransparency: undefined,
    defaultBarStrokeColor: undefined, defaultBarStrokeWidth: undefined, defaultBarStrokeTransparency: undefined,
    defaultBarLabel: undefined, defaultBarLabelPosition: 'left', defaultBarTooltip: undefined,
    barSpacing: 40, barLabelMaxLength: 50
  } as Properties;

  readonly defaultFieldGroups = {
    bars: createDefaultFieldGroup(
      ['barIdField'],
      [
        'barStartField', 'barEndField',
        'barWeightField', 'barStackOrderField', 'barColorField', 'barTransparencyField',
        'barStrokeColorField', 'barStrokeWidthField', 'barStrokeTransparencyField',
        'barLabelField', 'barLabelPositionField', 'barTooltipField'
      ]
    )
  };

  fieldNameFor(key: string, _group: string): string {
    return barsFieldNameMapping[key];
  }
}
