import { Injectable, Optional, SkipSelf } from '@angular/core';
import { LoggerFactory } from '../logger-factory';
import { Logger } from '../logger';
import { NullLogger } from './logger';

@Injectable()
export class NullLoggerFactory extends LoggerFactory {
  constructor(@SkipSelf() @Optional() parent?: LoggerFactory) {
    super(parent);
  }

  createLogger(name?: string): Logger {
    return new NullLogger(name);
  }
}
