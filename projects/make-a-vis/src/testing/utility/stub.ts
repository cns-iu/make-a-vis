import { Component, EventEmitter, Type } from '@angular/core';

export type Options<In extends string, Out extends string> =
  Partial<Component> &
  { inputs?: In[] } &
  { outputs?: Out[] };

export type StubType<In extends string = string, Out extends string = string> =
  Type<
    Record<In, any> &
    Record<Out, EventEmitter<any>>
  >;

export function createStubComponent<In extends string, Out extends string>(
  selector: string,
  options: Options<In, Out> = {}
): StubType<In, Out> {
  const outputs: string[] = options.outputs || [];
  const decorator = Component(Object.assign({ selector, template: '' }, options));
  const stub = class StubComponent {
    constructor() {
      for (const out of outputs) {
        this[out] = new EventEmitter();
      }
    }
  };

  return (decorator(stub) || stub) as StubType<In, Out>;
}
