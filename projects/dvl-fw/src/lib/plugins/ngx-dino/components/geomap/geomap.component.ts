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

export type FieldGroups = {  }; // tslint:disable-line:interface-over-type-literal

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
    // TODO
  };

  fieldNameFor(key: string): string {
    return ''; // TODO
  }
}
