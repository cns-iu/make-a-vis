import { Injectable } from '@angular/core';

@Injectable({
  providedIn: null
})
export class Logger {
  set level(level: string) { }
  get level(): string { return 'OFF'; }

  constructor(readonly category?: string) { }

  isLevelEnabled(level?: string): boolean { return false; }
  isTraceEnabled(): boolean { return false; }
  isDebugEnabled(): boolean { return false; }
  isInfoEnabled(): boolean { return false; }
  isWarnEnabled(): boolean { return false; }
  isErrorEnabled(): boolean { return false; }
  isFatalEnabled(): boolean { return false; }

  log(...args: any[]): void { }
  trace(message: any, ...args: any[]): void { }
  debug(message: any, ...args: any[]): void { }
  info(message: any, ...args: any[]): void { }
  warn(message: any, ...args: any[]): void { }
  error(message: any, ...args: any[]): void { }
  fatal(message: any, ...args: any[]): void { }
}
