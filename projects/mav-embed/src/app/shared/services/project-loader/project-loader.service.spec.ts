import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NgModule, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { ProjectLoaderService } from './project-loader.service';

@Component({ selector: 'mav-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('ProjectLoaderService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: ProjectLoaderService;
  let shallow: Shallow<TestComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .import(HttpClientTestingModule)
      .dontMock(ProjectLoaderService);

    ({ get } = await shallow.render());
    service = get(ProjectLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
