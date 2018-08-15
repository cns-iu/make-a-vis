import { ClassProvider, Type } from '@angular/core';
import { Logger } from './logger';

export abstract class LoggerFactory {
  static use<C extends Type<LoggerFactory>>(cls: C): ClassProvider {
    return {
      provide: LoggerFactory,
      useClass: cls
    };
  }

  abstract createLogger(category?: string): Logger;
}
