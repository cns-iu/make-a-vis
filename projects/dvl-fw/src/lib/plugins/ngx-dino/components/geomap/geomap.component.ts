import { Component, OnInit, Input } from '@angular/core';
import { GeomapComponent as NgxGeomapComponent } from '@ngx-dino/geomap';
import { BaseVisualizationComponent } from '../base-visualization-component';
import { createDefaultFieldGroup, createFieldNameMapping } from '../utility';

export type Properties = Pick<
  NgxGeomapComponent,
  'showCounties' | 'mapDisplayLevel' | 'stateDefaultColor' | 'stateDefaultStrokeColor'
>;

export type StateFields = Pick<
  NgxGeomapComponent,
  'stateField' | 'stateColorField'
>;

export type PointFields = Pick<
  NgxGeomapComponent,
  'pointIdField' | 'pointLatLongField' | 'pointSizeField' | 'pointColorField' |
  'pointShapeField' | 'strokeColorField' | 'pointTitleField' | 'pointPulseField'
>;

// tslint:disable-next-line:interface-over-type-literal
export type FieldGroups = {
  states: StateFields,
  points: PointFields
};

@Component({
  selector: 'dvl-vis-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent extends BaseVisualizationComponent<Properties, FieldGroups> {
  defaultProperties: Properties = {
    showCounties: false, mapDisplayLevel: 'us',
    stateDefaultColor: '#bebebe', stateDefaultStrokeColor: 'white'
  };

  defaultFieldGroups: FieldGroups = {
    states: createDefaultFieldGroup(['stateField', 'stateColorField']),
    points: createDefaultFieldGroup([
      'pointIdField', 'pointLatLongField', 'pointSizeField', 'pointColorField',
      'pointShapeField', 'strokeColorField', 'pointTitleField', 'pointPulseField'
    ])
  };

  fieldNameFor(key: string): string {
    return ''; // TODO
  }
}
