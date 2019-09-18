import { pick } from 'lodash';

import { DataVariable, RecordSet } from '../../interfaces';

export type DefaultDataVariableArg = Pick<DataVariable, 'id' | 'label' | 'dataType' | 'scaleType'>;

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;

  constructor(data: DefaultDataVariableArg, public recordSet: RecordSet) {
    Object.assign(this, data);
  }

  toJSON(): any {
    return pick(this, ['id', 'label', 'dataType', 'scaleType']);
  }
}
