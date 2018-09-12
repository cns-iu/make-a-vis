import { simpleField, access, Field } from '@ngx-dino/core';

// not user facing
export const pointIdField = simpleField<string>({
  bfieldId: 'id',
  label: 'Race ID',

  operator: access('id')
});

export const xField = simpleField<number>({
  bfieldId: 'x',
  label: 'X',

  operator: access('x')
});

export const yField = simpleField<number>({
  bfieldId: 'y',
  label: 'Y',

  operator: access('y')
});

export const colorField = simpleField<string>({
  bfieldId: 'color',
  label: 'Color',

  operator: access('color')
});

export const shapeField = simpleField<string>({
  bfieldId: 'shape',
  label: 'Shape',

  operator: access('shape')
});

export const sizeField = simpleField<number>({
  bfieldId: 'size',
  label: 'Size',

  operator: access('size')
});


export const strokeField = simpleField<string>({
  bfieldId: 'stroke',
  label: 'Stroke',

  operator: access('stroke')
});

export const tooltipTextField = simpleField<number>({
  bfieldId: 'tooltipText',
  label: 'Tooltip Text',

  operator: access('id')
});

export const pulseField = simpleField<boolean>({
  bfieldId: 'pulse',
  label: 'Pulse',

  operator: access('pulse', false)
});

export const colorCategoryField = simpleField<string>({
  bfieldId: 'colorCategory',
  label: 'Color Category',

  operator: access('colorCategory', 'Unknown')
});


