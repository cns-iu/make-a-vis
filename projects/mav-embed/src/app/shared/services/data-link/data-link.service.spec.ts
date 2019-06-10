import { Component, NgModule, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { DataLinkService } from './data-link.service';

@Component({ selector: 'mav-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('DataLinkService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: DataLinkService;
  let shallow: Shallow<TestComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(DataLinkService);

    ({ get } = await shallow.render());
    service = get(DataLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
