import { Injectable } from '@angular/core';
import { Category, LogLevel as ImplLogLevel } from 'typescript-logging';
import { LogLevel } from '../log-levels';
import { Logger, ValueOrFactory } from '../logger';

const levelToImplLevel: {[level: number]: ImplLogLevel} = {};
const implLevelToLevel: {[impl: number]: LogLevel} = {};

// Initialize mappings
([
  [LogLevel.Trace, ImplLogLevel.Trace],
  [LogLevel.Debug, ImplLogLevel.Debug],
  [LogLevel.Info, ImplLogLevel.Info],
  [LogLevel.Warn, ImplLogLevel.Warn],
  [LogLevel.Error, ImplLogLevel.Error],
  [LogLevel.Fatal, ImplLogLevel.Fatal]
] as [LogLevel, ImplLogLevel][]).forEach(([level, impl]) => {
  levelToImplLevel[level] = impl;
  implLevelToLevel[impl] = level;
});

export class TypescriptLoggingLogger extends Logger {
  get name(): string { return this.category.name; }
  readonly level: LogLevel;
  readonly category: Category;

  constructor(name: string, parent: Category, level: ImplLogLevel) {
    super();
    this.level = implLevelToLevel[level];
    this.category = this.findOrCreateCategory(name, parent);
  }

  trace(message: ValueOrFactory<string>): void { this.category.trace(message); }
  debug(message: ValueOrFactory<string>): void { this.category.debug(message); }
  info(message: ValueOrFactory<string>): void { this.category.info(message); }
  warn(message: ValueOrFactory<string>): void { this.category.warn(message); }
  error(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void { this.category.error(message, error || null); }
  fatal(message: ValueOrFactory<string>, error?: ValueOrFactory<Error>): void { this.category.fatal(message, error || null); }

  private findOrCreateCategory(name: string, parent: Category): Category {
    const category = parent.children.find((cat) => cat.name === name);
    return category || new Category(name, parent);
  }
}
