import { NgModule, Type } from '@angular/core';
import { DvlFwModule } from '@dvl-fw/core';
import { Shallow } from 'shallow-render';

import { VisualizationComponent } from './visualization.component';

@NgModule({ imports: [DvlFwModule], declarations: [VisualizationComponent], exports: [VisualizationComponent] })
class TestModule { }

describe('VisualizationComponent', () => {
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<VisualizationComponent>;
  let component: VisualizationComponent;

  // FIXME setup is failing
  beforeEach(async () => {
    shallow = new Shallow(VisualizationComponent, TestModule);

    ({ instance: component, get } = await shallow.render({ bind: { project: '#foo' } }));
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
