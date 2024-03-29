import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NetworkSpecOptions } from '../network.vega';

@Component({
  selector: 'dvl-network-settings',
  templateUrl: './network-settings.component.html',
  styleUrls: ['./network-settings.component.scss']
})
export class NetworkSettingsComponent implements OnChanges {
  @Input() options: NetworkSpecOptions;
  @Input() enableZoomPan: boolean;
  @Input() nodeSizeScalar = 100;
  @Input() edgeWidthScalar = 100;

  @Output() optionsChange = new EventEmitter<NetworkSpecOptions>();

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

  nodeSizeChange(value: number): void {
    this.nodeSizeScalar = value;
    this.options = {...this.options, nodeSizeScalar: this.nodeSizeScalar};
    this.optionsChange.emit(this.options);
  }

  edgeWidthChange(value: number): void {
    this.edgeWidthScalar = value;
    this.options = {...this.options, edgeWidthScalar: this.edgeWidthScalar};
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
