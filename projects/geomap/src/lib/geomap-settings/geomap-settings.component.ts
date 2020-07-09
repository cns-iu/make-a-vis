import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('settings', { static: true, read: ElementRef }) contentElement: ElementRef<HTMLElement>;
  @ViewChild('selectionPanel', { static: true, read: ElementRef }) optionElement: ElementRef<HTMLElement>;

  optionsHidden = true;

  togglePanel() {
    this.optionsHidden = !this.optionsHidden;
  }

  basemapChange(value: 'usa' | 'world'): void {
    this.basemap = value;
    this.options = {...this.options, basemap: this.basemap, country: this.country};
    this.optionsChange.emit(this.options);
  }

  projectionChange(value: string): void {
    this.projection = value;
    this.options = {...this.options, projection: this.projection};
    this.optionsChange.emit(this.options);
  }

  countryChange(value: string): void {
    this.country = value;
    this.options = {...this.options, country: this.country};
    this.optionsChange.emit(this.options);
  }

  stateChange(value: string): void {
    this.state = value;
    this.options = {...this.options, state: this.state};
    this.optionsChange.emit(this.options);
  }

  zoomChange(value: boolean): void {
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
      this.enableZoomPan = this.options?.enableZoomPan ?? false;
      this.basemap = this.options?.basemap;
      this.country = this.options?.country;
      this.state = this.options?.state;
      this.projection = this.options?.projection;
    }
  }

  @HostListener('document:click', ['$event.target']) // tslint:disable-line:no-unsafe-any
  close(target: HTMLElement): void {
    const optionsPanels = Array.from(document.getElementsByClassName('selectionPanel'));
    const { contentElement: { nativeElement: content } = { nativeElement: undefined } } = this;
    if (content?.contains(target)) {
      return;
    }
    for (const element of optionsPanels) {
      if (element?.contains(target)) {
        return;
      }
    }
    this.optionsHidden = true;
  }
}
