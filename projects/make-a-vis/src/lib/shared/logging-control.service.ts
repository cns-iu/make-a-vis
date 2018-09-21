import { Injectable } from '@angular/core';
import { LoggerType } from 'typescript-logging';
import { TypescriptLoggerFactory } from '@ngx-dino/core';
import { StoreLogger } from './store-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggingControlService {
  private _enabled = true;

  constructor(readonly factory: TypescriptLoggerFactory) {
    factory.configure(LoggerType.Custom, undefined, (root, setting) => {
      return new StoreLogger(root, setting, this);
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
