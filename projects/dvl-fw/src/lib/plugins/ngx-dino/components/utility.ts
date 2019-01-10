// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { forEach, identity } from 'lodash';

import { BoundField, constant, simpleField } from '@ngx-dino/core';


export const emptyField = simpleField({
  id: 'empty',
  label: 'Empty',
  operator: constant(undefined)
}).getBoundField();


export function createFieldNameMapping<S extends string, C extends { [key: string]: string }>(
  simple: S[] = [], complex: C = {} as any, prefix: string = ''
): C & { [K in S]: string } {
  const transform: (key: string) => string = prefix ? s => (s.charAt(0).toUpperCase() + s.slice(1)) : identity;
  const simpleObj = simple.reduce((obj, key) => (obj[key] = `${prefix}${transform(key)}Field`, obj), {} as any);
  return Object.assign(simpleObj, complex);
}

export function createDefaultFieldGroup<S1 extends string, S2 extends string>(
  emptyFields: S1[] = [], undefFields: S2[] = []
): { [K in S1]: BoundField<any> } & { [K in S2]: undefined } {
  const result: any = {};
  forEach(emptyFields, (field) => result[field] = emptyField);
  forEach(undefFields, (field) => result[field] = undefined);
  return result;
}
