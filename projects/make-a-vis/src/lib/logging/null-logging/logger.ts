import { Injectable } from '@angular/core';
import { LogLevel } from '../log-levels';
import { Logger, ValueOrFactory } from '../logger';

@Injectable()
export class NullLogger extends Logger {
  get level(): LogLevel { return LogLevel.Off; }
  constructor(readonly name: string = '<?>') { super(); }

  trace(message: ValueOrFactory<string>): void { }
  debug(message: ValueOrFactory<string>): void { }
  info(message: ValueOrFactory<string>): void { }
  warn(message: ValueOrFactory<string>): void { }
  error(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void { }
  fatal(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void { }
}
