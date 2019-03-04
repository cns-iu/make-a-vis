import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkIconComponent } from './network-icon.component';

describe('NetworkIconComponent', () => {
  let component: NetworkIconComponent;
  let fixture: ComponentFixture<NetworkIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
