import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import cheet from 'cheet.js';
import { AdvancedToggle, MavSelectionState } from '../../../mav-selection/shared/store';

export const MAV_ADVANCED_KEY = 'mavadvance.graphicoptions.advanced';

@Injectable({
  providedIn: 'root'
})

export class AdvancedService {

  constructor(private readonly store: Store<MavSelectionState>, private readonly zone: NgZone) {
    this.store.dispatch(new AdvancedToggle(localStorage.getItem(MAV_ADVANCED_KEY) !== null));
  }

  addAdvancedCheat() {
      cheet('a b', () => {
        if (localStorage.getItem(MAV_ADVANCED_KEY) === null) {
          this.zone.run(() => {
            this.store.dispatch(new AdvancedToggle(true));
          });
          localStorage.setItem(MAV_ADVANCED_KEY, 'true');
        } else {
          this.zone.run(() => {
            this.store.dispatch(new AdvancedToggle(false));
          });
          localStorage.removeItem(MAV_ADVANCED_KEY);
        }
      });
  }
}
