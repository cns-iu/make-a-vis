import { BoundField, simpleField, access } from '@ngx-dino/core';

export class GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  asBoundField<T = any>(): BoundField<T> {
    return simpleField<T>({ label: this.label, operator: access(this.selector) }).getBoundField();
  }
}
