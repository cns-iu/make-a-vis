import { BoundField } from '@ngx-dino/core';

export class GraphicVariable {
  id: string;
  type: string;
  selector: string;

  asBoundField(): BoundField<any> {
    return null;
  }
}
