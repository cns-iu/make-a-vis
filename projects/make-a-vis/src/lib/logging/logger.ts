import { FactoryProvider } from '@angular/core';
import { LogLevel } from './log-levels';
import { LoggerFactory } from './logger-factory';

export type ValueOrFactory<T> = T | (() => T);

// @dynamic
export abstract class Logger {
  static for(name?: string): FactoryProvider {
    return {
      provide: Logger,
      useFactory: (factory: LoggerFactory) => factory.createLogger(name),
      deps: [LoggerFactory]
    };
  }

  abstract get name(): string;
  abstract get level(): LogLevel;

  isLevelEnabled(level: LogLevel): boolean { return level >= this.level; }
  isTraceEnabled(): boolean { return this.isLevelEnabled(LogLevel.Trace); }
  isDebugEnabled(): boolean { return this.isLevelEnabled(LogLevel.Debug); }
  isInfoEnabled(): boolean { return this.isLevelEnabled(LogLevel.Info); }
  isWarnEnabled(): boolean { return this.isLevelEnabled(LogLevel.Warn); }
  isErrorEnabled(): boolean { return this.isLevelEnabled(LogLevel.Error); }
  isFatalEnabled(): boolean { return this.isLevelEnabled(LogLevel.Fatal); }

  abstract trace(message: ValueOrFactory<string>): void;
  abstract debug(message: ValueOrFactory<string>): void;
  abstract info(message: ValueOrFactory<string>): void;
  abstract warn(message: ValueOrFactory<string>): void;
  abstract error(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void;
  abstract fatal(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void;
}
