import { NgModule, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { LegendComponent } from './legend.component';

@NgModule({ declarations: [LegendComponent], exports: [LegendComponent] })
class TestModule { }

describe('LegendComponent', () => {
  let get: <T>(type: Type<T>) => T;
  let component: LegendComponent;
  let shallow: Shallow<LegendComponent>;

  beforeEach(async () => {
    shallow = new Shallow(LegendComponent, TestModule);

    ({ instance: component, get } = await shallow.render());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
