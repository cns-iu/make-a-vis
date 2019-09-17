import { RecordSet } from './record-set';

export enum DataType {
  STRING = 'string', // 'always' nominal
  NUMBER = 'number', // start with 'interval'
  INTEGER = 'integer', // start with 'interval' or 'ratio'
  BOOLEAN = 'boolean', // 'pretty much' nominal
  DATE = 'date', // typically interval, but maybe ratio if based on observed zero start time
  DATETIME = 'datetime', // typically interval, but maybe ratio if based on observed zero start time
  UNKNOWN = 'unknown'
}

export enum ScaleType {
  NOMINAL = 'nominal',
  ORDINAL = 'ordinal',
  INTERVAL = 'interval',
  RATIO = 'ratio',
  UNKNOWN = 'unknown'
}

export interface DataVariable {
  id: string;
  label: string;
  dataType: DataType | string;
  scaleType: ScaleType | string;
  recordSet: RecordSet;
  toJSON(): any;
}
