import { RecordStream } from './record-stream';
import { RecordSet } from './record-set';
import { BoundField } from '@ngx-dino/core';
import { DataVariable } from './data-variable';

export interface GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  recordStream: RecordStream;
  recordSet: RecordSet;
  dataVariable: DataVariable;

  asBoundField<T = any>(): BoundField<T>;
  toJSON(): any;
}
