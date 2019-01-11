// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { pick } from 'lodash';

import { DataVariable } from '../../shared/data-variable';
import { RecordStream } from '../../shared/record-stream';

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordStream: RecordStream;

  constructor(data: {id: string, label: string, dataType: string, scaleType: string}, recordStream: RecordStream) {
    Object.assign(this, {...data, recordStream: recordStream});
  }
  toJSON(): any {
    return Object.assign({}, pick(this, ['id', 'label', 'dataType', 'scaleType']));
  }
}
