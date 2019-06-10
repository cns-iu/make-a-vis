import { Type } from '@angular/core';
import { DvlFwModule } from '@dvl-fw/core';
import { Shallow } from 'shallow-render';

import { AppModule } from '../app.module';
import { VisualizationComponent } from './visualization.component';

describe('VisualizationComponent', () => {
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<VisualizationComponent>;
  let component: VisualizationComponent;

  beforeEach(async () => {
    shallow = new Shallow(VisualizationComponent, AppModule)
      .dontMock(DvlFwModule);

    ({ instance: component, get } = await shallow.render({ bind: { project: '#foo' } }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
