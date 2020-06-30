import { Datum } from '@ngx-dino/core';

export interface Subdiscipline {
  id: string;
  weight: string;
}

export interface SubdisciplineDatum extends Datum<any> {
  size: number;
  tooltipText: string;
  subdisciplineName: string;
}
