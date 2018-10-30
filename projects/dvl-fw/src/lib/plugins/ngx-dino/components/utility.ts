// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { BoundField, constant, simpleField } from '@ngx-dino/core';
import { capitalize, identity } from 'lodash';


export const emptyField = simpleField({
  id: 'empty',
  label: 'Empty',
  operator: constant(undefined)
}).getBoundField();


export function createFieldNameMapping<S extends string, C extends { [key: string]: string }>(
  simple: S[] = [], complex: C = {} as any, prefix: string = ''
): C & { [K in S]: string } {
  const transform = prefix ? capitalize : identity;
  const simpleObj = simple.reduce((obj, key) => (obj[key] = `${prefix}${transform(key)}Field`, obj), {} as any);
  return Object.assign(simpleObj, complex);
}

export function createDefaultFieldGroup<S extends string>(fields: S[]): { [K in S]: BoundField<any> } {
  return fields.reduce((obj, field) => (obj[field] = emptyField, obj), {} as any);
}
