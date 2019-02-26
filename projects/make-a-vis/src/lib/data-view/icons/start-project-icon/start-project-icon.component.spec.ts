import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjectIconComponent } from './start-project-icon.component';

describe('StartProjectIconComponent', () => {
  let component: StartProjectIconComponent;
  let fixture: ComponentFixture<StartProjectIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartProjectIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProjectIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
