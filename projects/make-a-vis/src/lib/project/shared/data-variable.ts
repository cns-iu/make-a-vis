import { Field } from '@ngx-dino/core';

import { GraphicVariable } from './graphic-variable';

export class DataVariable {
  id: string;
  label: string;
  dataType: string;
  scaleType: string;

  mappings: Map<string, GraphicVariable[]>;

  getGraphicVariables(recordStreamId: string, type: string): GraphicVariable[] {
    return (this.mappings.get(recordStreamId) || []).filter((gv) => gv.type === type);
  }

  asField(recordStreamId: string): Field<any> {
    return null;
  }
}
