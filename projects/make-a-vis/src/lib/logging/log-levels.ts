import { isString } from 'lodash';

export enum LogLevel {
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
  Off
}

export namespace LogLevel_Ext {
  const levelToStringMap: {[level: number]: string} = {};
  const stringToLevelMap: {[name: string]: number} = {};

  // Initialize mappings
  ([
    [LogLevel.Trace, 'trace'],
    [LogLevel.Debug, 'debug'],
    [LogLevel.Info, 'info'],
    [LogLevel.Warn, 'warn'],
    [LogLevel.Error, 'error'],
    [LogLevel.Fatal, 'fatal'],
    [LogLevel.Off, 'off']
  ] as [LogLevel, string][]).forEach(([level, name]) => {
    levelToStringMap[level] = name;
    stringToLevelMap[name] = level;
  });

  export function fromString(name: string, defaultLevel: LogLevel = LogLevel.Off): LogLevel {
    return (isString(name) && stringToLevelMap[name.toLowerCase()]) || defaultLevel;
  }

  export function toString(level: LogLevel): string {
    return levelToStringMap[level] || '';
  }
}
