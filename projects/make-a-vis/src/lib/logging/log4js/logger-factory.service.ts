import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Configuration, configure, shutdown } from 'log4js';
import { LoggerFactory } from '../logger-factory';
import { Log4JsLogger } from './logger';

export const Log4JsConfiguration = new InjectionToken<Configuration>('log4js-configuration', {
  providedIn: 'root',
  factory: () => ({
    appenders: {
      defaultOut: {type: 'stdout'}
    },
    categories: {
      default: {appenders: ['defaultOut'], level: 'error'}
    }
  })
});

@Injectable({
  providedIn: null
})
export class Log4JsLoggerFactoryService extends LoggerFactory implements OnDestroy {
  constructor(@Inject(Log4JsConfiguration) config: Configuration) {
    super();
    configure(config);
  }

  ngOnDestroy(): void {
    shutdown();
  }

  createLogger(category?: string): Log4JsLogger {
    return new Log4JsLogger(category);
  }
}
