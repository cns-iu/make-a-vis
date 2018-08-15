import { FactoryProvider } from '@angular/core';
import { LoggerFactory } from './logger-factory';

export abstract class Logger {
  static for(category: string): FactoryProvider {
    return {
      provide: Logger,
      useFactory: (factory: LoggerFactory) => factory.createLogger(category),
      deps: [LoggerFactory]
    };
  }

  abstract set level(level: string);
  abstract get level(): string;

  constructor(readonly category?: string) { }

  abstract isLevelEnabled(level?: string): boolean;
  abstract isTraceEnabled(): boolean;
  abstract isDebugEnabled(): boolean;
  abstract isInfoEnabled(): boolean;
  abstract isWarnEnabled(): boolean;
  abstract isErrorEnabled(): boolean;
  abstract isFatalEnabled(): boolean;

  abstract log(...args: any[]): void;
  abstract trace(message: any, ...args: any[]): void;
  abstract debug(message: any, ...args: any[]): void;
  abstract info(message: any, ...args: any[]): void;
  abstract warn(message: any, ...args: any[]): void;
  abstract error(message: any, ...args: any[]): void;
  abstract fatal(message: any, ...args: any[]): void;
}
