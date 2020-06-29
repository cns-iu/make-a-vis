import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import embed from 'vega-embed';

import { VegaManagerService } from './vega-manager.service';


@Component({
  selector: 'ngx-vega',
  template: '',
  providers: [VegaManagerService]
})
export class VegaComponent implements OnChanges {
  @Input() spec: Parameters<typeof embed>[1];

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly manager: VegaManagerService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('spec' in changes && this.spec) {
      const { manager, elementRef: { nativeElement }, spec } = this;
      manager.create(nativeElement, spec, {}); // TODO opts
    }
  }
}
