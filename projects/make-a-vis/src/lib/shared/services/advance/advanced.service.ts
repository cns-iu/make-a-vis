import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import cheet from 'cheet.js';

import { AdvancedToggle, MavSelectionState } from '../../../mav-selection/shared/store';

export const MAV_ADVANCED_KEY = 'mavadvance.graphicoptions.advanced';

@Injectable({
  providedIn: 'root'
})

export class AdvancedService {
  /**
   * Creates an instance of advanced service.
   * @param store for MavSelection State
   * @param zone Angular zone to run cheet.js in Angular's zone
   */
  constructor(private readonly store: Store<MavSelectionState>, private readonly zone: NgZone) {
    this.addAdvancedCheat();
    if (this.store.dispatch) {
      this.store.dispatch(new AdvancedToggle(this.advancedEnabled));
    }
  }

  /**
   * Gets advanced enabled
   */
  get advancedEnabled(): boolean {
    return localStorage[MAV_ADVANCED_KEY] === 'true';
  }

  /**
   * Sets advanced enabled
   */
  set advancedEnabled(enabled: boolean) {
    if (enabled) {
      localStorage[MAV_ADVANCED_KEY] = 'true';
    } else {
      localStorage.removeItem(MAV_ADVANCED_KEY);
    }
    this.zone.run(() => {
      this.store.dispatch(new AdvancedToggle(enabled));
    });
  }

  /**
   * Adds advanced cheat to the application.
   */
  addAdvancedCheat(): void {
    // TODO: Change this cheat after development is complete
    cheet('a b', () => this.advancedEnabled = !this.advancedEnabled);
  }
}
