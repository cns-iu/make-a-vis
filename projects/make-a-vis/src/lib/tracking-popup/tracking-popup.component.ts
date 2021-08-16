import { Component, ElementRef, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TrackingState } from '../shared/store/tracking-state';


@Component({
  selector: 'mav-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.css']
})
export class TrackingPopupComponent {

  container: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(elementRef: ElementRef<HTMLElement>, readonly tracking: TrackingState, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.container = elementRef.nativeElement;
  }

  dismiss(): void {
    this.data.preClose();
  }

  submit(entry: boolean): void {
    this.tracking.setAllowTelemetry(entry);
    this.dismiss();
  }

}
