import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiceLogoComponent } from './sice-logo.component';

describe('SiceLogoComponent', () => {
  let component: SiceLogoComponent;
  let fixture: ComponentFixture<SiceLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiceLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiceLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
