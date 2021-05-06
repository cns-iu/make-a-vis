import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { Shallow } from 'shallow-render';

import { ProjectComponent } from './project.component';

@NgModule({ declarations: [ProjectComponent], exports: [ProjectComponent] })
class TestModule { }

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let shallow: Shallow<ProjectComponent>;

  beforeEach(async () => {
    shallow = new Shallow(ProjectComponent, TestModule)
      .import(HttpClientTestingModule);

    ({ instance: component } = await shallow.render());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
