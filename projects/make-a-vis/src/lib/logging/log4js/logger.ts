import { getLogger } from 'log4js';
import { Logger } from '../logger';

export class Log4JsLogger extends Logger {
  private logger = getLogger(this.category);
  set level(level: string) { this.logger.level = level; }
  get level(): string { return this.logger.level; }

  isLevelEnabled(level?: string): boolean { return this.logger.isLevelEnabled(level); }
  isTraceEnabled(): boolean { return this.logger.isTraceEnabled(); }
  isDebugEnabled(): boolean { return this.logger.isDebugEnabled(); }
  isInfoEnabled(): boolean { return this.logger.isInfoEnabled(); }
  isWarnEnabled(): boolean { return this.logger.isWarnEnabled(); }
  isErrorEnabled(): boolean { return this.logger.isErrorEnabled(); }
  isFatalEnabled(): boolean { return this.logger.isFatalEnabled(); }

  log(...args: any[]): void { this.logger.log(...args); }
  trace(message: any, ...args: any[]): void { this.logger.trace(message, ...args); }
  debug(message: any, ...args: any[]): void { this.logger.debug(message, ...args); }
  info(message: any, ...args: any[]): void { this.logger.info(message, ...args); }
  warn(message: any, ...args: any[]): void { this.logger.warn(message, ...args); }
  error(message: any, ...args: any[]): void { this.logger.error(message, ...args); }
  fatal(message: any, ...args: any[]): void { this.logger.fatal(message, ...args); }
}
