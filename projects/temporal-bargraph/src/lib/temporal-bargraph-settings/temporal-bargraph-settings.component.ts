import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TemporalBargraphSpecOptions } from '../temporal-bargraph.vega';

@Component({
  selector: 'dvl-temporal-settings',
  templateUrl: './temporal-bargraph-settings.component.html',
  styleUrls: ['./temporal-bargraph-settings.component.scss']
})
export class TemporalSettingsComponent implements OnChanges {
  @Input() options: TemporalBargraphSpecOptions;
  @Input() expanded = false;

  @Output() optionsChange = new EventEmitter<TemporalBargraphSpecOptions>();

  @ViewChild('settings', { static: true, read: ElementRef }) contentElement: ElementRef<HTMLElement>;
  @ViewChild('selectionPanel', { static: true, read: ElementRef }) optionElement: ElementRef<HTMLElement>;

  optionsHidden = true;

  togglePanel() {
    this.optionsHidden = !this.optionsHidden;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.options = {...this.options, expanded: this.expanded};
    this.optionsChange.emit(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.expanded = this.options?.expanded ?? false;
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
