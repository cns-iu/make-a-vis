import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateNotificationComponent } from './app-update-notification.component';

describe('SnackbarComponent', () => {
  let component: AppUpdateNotificationComponent;
  let fixture: ComponentFixture<AppUpdateNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUpdateNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUpdateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
