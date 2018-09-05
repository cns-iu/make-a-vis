import { BoundField } from '@ngx-dino/core';

export interface GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  asBoundField<T = any>(): BoundField<T>;
  toJSON(): any;
}
