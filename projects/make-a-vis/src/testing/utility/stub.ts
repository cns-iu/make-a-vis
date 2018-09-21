import { Component, EventEmitter, Type } from '@angular/core';

export type Options<In extends string, Out extends string> =
  Partial<Component> &
  { inputs?: In[] } &
  { outputs?: Out[] };

export type Stub<In extends string = string, Out extends string = string> =
    Record<In, any> &
    Record<Out, EventEmitter<any>>;

export function createStubComponent<In extends string, Out extends string>(
  selector: string,
  options: Options<In, Out> = {}
): Type<Stub<In, Out>> {
  const outputs: string[] = options.outputs || [];
  const decorator = Component(Object.assign({ selector, template: '' }, options));
  const stub = class StubComponent {
    constructor() {
      for (const out of outputs) {
        this[out] = new EventEmitter();
      }
    }
  };

  return (decorator(stub) || stub) as Type<Stub<In, Out>>;
}
