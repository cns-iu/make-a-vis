import { Injectable } from '@angular/core';
import { ApplicationState, getLoadedProject } from '../../shared/store';
import { StoreLogger } from './store-logger';
import { Store, select } from '@ngrx/store';

import { LoggerType } from 'typescript-logging';
import { TypescriptLoggerFactory } from '@ngx-dino/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingControlService {
  private _enabled = true;

  constructor(factory: TypescriptLoggerFactory, private store: Store<ApplicationState>) {
    factory.configure(LoggerType.Custom, undefined, (root, setting) => {
      return new StoreLogger(root, setting, this, this.store);
    });
  }

  isLoggingEnabled(): boolean {
    return this._enabled;
  }

  enableLogging(): void {
    this._enabled = true;
  }

  disableLogging(): void {
    this._enabled = false;
  }

  toggleLogging(): void {
    this._enabled = !this._enabled;
  }
}
