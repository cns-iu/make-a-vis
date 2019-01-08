// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataVariable } from '../../shared/data-variable';
import { pick } from 'lodash';

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  recordStreamId: string;

  constructor(data: {id: string, label: string, dataType: string, scaleType: string}, recordStreamId: string) {
    Object.assign(this, {...data, recordStreamId: recordStreamId});
  }
  toJSON(): any {
    return Object.assign({}, pick(this, ['id', 'label', 'dataType', 'scaleType']));
  }
}
