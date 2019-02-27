import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjectOptionsComponent } from './start-project-options.component';

describe('StartProjectOptionsComponent', () => {
  let component: StartProjectOptionsComponent;
  let fixture: ComponentFixture<StartProjectOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartProjectOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProjectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
