import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TypescriptLoggerFactory } from '@ngx-dino/core';
import { LoggerType } from 'typescript-logging';

import { ApplicationState } from '../../shared/store';
import { SidenavState, ToggleLogging } from '../../toolbar/shared/store';
import { StoreLogger } from './store-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggingControlService {
  private _enabled = true;

  constructor(factory: TypescriptLoggerFactory, private store: Store<ApplicationState>, private sidenavStore: Store<SidenavState>) {
    factory.configure(LoggerType.Custom, undefined, (root, setting) => {
      return new StoreLogger(root, setting, this, this.store, this.sidenavStore);
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
    this.sidenavStore.dispatch(new ToggleLogging(this._enabled));
  }
}
