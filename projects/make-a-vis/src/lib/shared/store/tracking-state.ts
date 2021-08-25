import { Injectable } from '@angular/core';

export interface TrackingStateModel {
  allowTelemetry?: boolean;
}

export const LOCAL_STORAGE_ALLOW_TELEMETRY_KEY = 'ALLOW_TELEMETRY';
export const INITIAL_TELEMETRY_SETTING  = getTelemetryStorageSetting();

function getTelemetryStorageSetting(): boolean | undefined {
  const value = localStorage.getItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY);
  return value === null ? undefined : value.toLowerCase() === 'true';
}

export const INITIAL_TRACKING_STATE: TrackingStateModel = {
  allowTelemetry: INITIAL_TELEMETRY_SETTING
};

@Injectable({
  providedIn: 'root',
})
export class TrackingState {

  snapshot: TrackingStateModel;

  constructor() {
    this.snapshot = INITIAL_TRACKING_STATE;
  }

  setAllowTelemetry(allowTelemetry: boolean): void {
    const oldValue = getTelemetryStorageSetting();
    localStorage.setItem(LOCAL_STORAGE_ALLOW_TELEMETRY_KEY, allowTelemetry.toString());
    this.snapshot.allowTelemetry = allowTelemetry;

    if (oldValue !== undefined || allowTelemetry === false) {
      // This ensures that if telemetry is disabled that it _WONT_ send anything to Google Analytics
      location.reload();
    }
  }
}
