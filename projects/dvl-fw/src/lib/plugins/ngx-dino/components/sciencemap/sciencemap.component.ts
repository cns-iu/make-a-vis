// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { ScienceMapComponent as NgxSciencemapComponent } from '@ngx-dino/science-map';

import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxSciencemapComponent,
  'enableTooltip' | 'nodeSizeRange' | 'minPositionX' | 'minPositionY'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  subdisciplinePoints: Pick<
    NgxSciencemapComponent,
    'subdisciplineSizeField' | 'subdisciplineIdField' | 'tooltipTextField'
  >
};

// TODO: size, tooltip
const fieldNameMapping = createFieldNameMapping([
], {
  'identifier': 'subdisciplineIdField',
  'areaSize': 'subdisciplineSizeField',
  'tooltip': 'tooltipTextField'
}, 'subdiscipline');

@Component({
  selector: 'dvl-vis-science-map',
  templateUrl: './sciencemap.component.html',
  styleUrls: ['./sciencemap.component.css']
})
export class SciencemapComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  readonly defaultProperties: Properties = {
    enableTooltip: true, nodeSizeRange: [2, 18], minPositionX: 0, minPositionY: -20
  };

  readonly defaultFieldGroups: FieldGroups = {
    subdisciplinePoints: createDefaultFieldGroup([
      'subdisciplineSizeField', 'subdisciplineIdField', 'tooltipTextField'
    ])
  };

  fieldNameFor(key: string, group: string): string {
    return fieldNameMapping[key];
  }
}
