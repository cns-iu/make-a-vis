import { DataVariable } from '../../shared/data-variable';

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;
  constructor(data: any) {
    Object.assign(this, data);
  }
  toJSON(): any {
    return Object.assign({}, this);
  }
}
