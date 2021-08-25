import { Component, ElementRef, Inject, HostBinding } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TrackingState } from '../shared/store/tracking-state';


@Component({
  selector: 'mav-tracking-popup',
  templateUrl: './tracking-popup.component.html',
  styleUrls: ['./tracking-popup.component.scss']
})
export class TrackingPopupComponent {
  @HostBinding('class') readonly clsName = 'mav-tracking-popup';

  container: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(elementRef: ElementRef<HTMLElement>, @Inject(MAT_SNACK_BAR_DATA) public data: any, private tracking: TrackingState) {
    this.container = elementRef.nativeElement;
  }

  dismiss(): void {
    this.data.preClose();
  }

  submit(entry: boolean): void {
    this.tracking.setAllowTelemetry(entry);
    this.dismiss();
  }

  showButton(button: 'opt-in' | 'opt-out'): boolean {
    if (this.tracking.snapshot.allowTelemetry === undefined) {
      return true;
    } else {
      return button === 'opt-in' ? !this.tracking.snapshot.allowTelemetry : this.tracking.snapshot.allowTelemetry;
    }
  }
}
