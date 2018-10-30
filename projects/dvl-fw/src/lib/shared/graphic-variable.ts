// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { BoundField } from '@ngx-dino/core';

import { DataVariable } from './data-variable';
import { RecordSet } from './record-set';
import { RecordStream } from './record-stream';

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
