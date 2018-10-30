// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataVariable } from '../../shared/data-variable';

export class DefaultDataVariable implements DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;

  constructor(data: {id: string, label: string, dataType: string, scaleType: string}) {
    Object.assign(this, data);
  }
  toJSON(): any {
    return Object.assign({}, this);
  }
}
