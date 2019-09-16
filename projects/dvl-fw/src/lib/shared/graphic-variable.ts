// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { BoundField } from '@ngx-dino/core';

import { DataVariable } from './data-variable';
import { RecordSet } from './record-set';
import { RecordStream } from './record-stream';

export enum GraphicVariableType {
  IDENTIFIER = 'identifier',
  TEXT = 'text',
  TOOLTIP = 'tooltip',

  AXIS = 'axis',
  INPUT = 'input',
  LABEL = 'label',
  LABEL_POSITION = 'labelPosition',
  FONT_SIZE = 'fontSize',
  ORDER = 'order',

  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  X = 'x',
  Y = 'y',
  Z = 'z',

  SHAPE = 'shape',
  PULSE = 'pulse',

  HEIGHT = 'height',
  AREA_SIZE = 'areaSize',
  COLOR = 'color',
  TRANSPARENCY = 'transparency',

  STROKE_WIDTH = 'strokeWidth',
  STROKE_COLOR = 'strokeColor',
  STROKE_TRANSPARENCY = 'strokeTransparency',
}

// advanced knob

export interface GraphicVariable {
  id: string;
  label: string;
  type: GraphicVariableType | string;
  selector: string;

  recordStream: RecordStream;
  recordSet: RecordSet;
  dataVariable: DataVariable;

  asBoundField<T = any>(): BoundField<T>;
  toJSON(): any;
}
