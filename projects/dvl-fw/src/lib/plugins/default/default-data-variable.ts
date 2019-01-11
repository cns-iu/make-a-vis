// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { pick } from 'lodash';

import { DataVariable } from '../../shared/data-variable';
import { RecordSet } from '../../shared/record-set';

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordSet: RecordSet;

  constructor(data: {id: string, label: string, dataType: string, scaleType: string}, recordSet: RecordSet) {
    Object.assign(this, {...data, recordSet: recordSet});
  }
  toJSON(): any {
    return Object.assign({}, pick(this, ['id', 'label', 'dataType', 'scaleType']));
  }
}
