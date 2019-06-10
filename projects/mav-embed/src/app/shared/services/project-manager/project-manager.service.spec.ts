import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NgModule, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { ProjectManagerService } from './project-manager.service';

@Component({ selector: 'mav-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('ProjectManagerService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: ProjectManagerService;
  let shallow: Shallow<TestComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .import(HttpClientTestingModule)
      .dontMock(ProjectManagerService);

    ({ get } = await shallow.render());
    service = get(ProjectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
