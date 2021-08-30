import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ScatterplotSpecOptions } from '../scatterplot.vega';

@Component({
  selector: 'dvl-scatterplot-settings',
  templateUrl: './scatterplot-settings.component.html',
  styleUrls: ['./scatterplot-settings.component.scss']
})
export class ScatterplotSettingsComponent implements OnChanges {
  @Input() options: ScatterplotSpecOptions;
  @Input() enableZoomPan: boolean;

  @Output() optionsChange = new EventEmitter<ScatterplotSpecOptions>();

  @ViewChild('settings', { static: true, read: ElementRef }) contentElement: ElementRef<HTMLElement>;
  @ViewChild('selectionPanel', { static: true, read: ElementRef }) optionElement: ElementRef<HTMLElement>;

  optionsHidden = true;

  togglePanel() {
    this.optionsHidden = !this.optionsHidden;
  }

  zoomChange(value: boolean): void {
    this.enableZoomPan = value;
    this.options = {...this.options, enableZoomPan: this.enableZoomPan};
    this.optionsChange.emit(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.enableZoomPan = this.options?.enableZoomPan ?? false;
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
