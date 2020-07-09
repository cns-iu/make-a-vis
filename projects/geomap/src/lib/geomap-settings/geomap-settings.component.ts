import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { GeomapSpecOptions } from '../geomap.vega';

@Component({
  selector: 'dvl-geomap-settings',
  templateUrl: './geomap-settings.component.html',
  styleUrls: ['./geomap-settings.component.scss']
})
export class GeomapSettingsComponent implements OnChanges {
  @Input() states = [];
  @Input() countries = [];
  @Input() projections: string[] = [];
  @Input() basemaps: string[] = [];
  @Input() options: GeomapSpecOptions;

  @Output() optionsChange = new EventEmitter<GeomapSpecOptions>();

  @Input() basemap: 'usa' | 'world';
  @Input() state: string | number;
  @Input() country: string | number;
  @Input() projection: string;
  @Input() enableZoomPan: boolean;

  optionsHidden = true;

  togglePanel() {
    this.optionsHidden = !this.optionsHidden;
  }

  basemapChange(value: 'usa' | 'world') {
    this.basemap = value;
    this.options = {...this.options, basemap: this.basemap, country: this.country};
    this.optionsChange.emit(this.options);
  }

  projectionChange(value: string) {
    this.projection = value;
    this.options = {...this.options, projection: this.projection};
    this.optionsChange.emit(this.options);
  }

  countryChange(value: string) {
    this.country = value;
    this.options = {...this.options, country: this.country};
    this.optionsChange.emit(this.options);
  }

  stateChange(value: string) {
    this.state = value;
    this.options = {...this.options, state: this.state};
    this.optionsChange.emit(this.options);
  }

  zoomChange(value: boolean) {
    this.enableZoomPan = value;
    this.options = {...this.options, enableZoomPan: this.enableZoomPan};
    this.optionsChange.emit(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.basemap && 'basemap' in changes) {
      this.options = {...this.options, basemap: this.basemap};
      this.optionsChange.emit(this.options);
    }
    if (this.country && 'country' in changes) {
      this.options = {...this.options, country: this.country};
      this.optionsChange.emit(this.options);
    }
    if (this.state && 'state' in changes) {
      this.options = {...this.options, state: this.state};
      this.optionsChange.emit(this.options);
    }
    if (this.projection && 'projection' in changes) {
      this.options = {...this.options, projection: this.projection};
      this.optionsChange.emit(this.options);
    }
    if ('options' in changes) {
      this.basemap = this.options?.basemap;
      this.country = this.options?.country;
      this.state = this.options?.state;
      this.projection = this.options?.projection;
    }
  }
}
