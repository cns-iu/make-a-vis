import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialogComponent } from './info-dialog.component';

describe('InfoDialogComponent', () => {
  let component: InfoDialogComponent;
  let fixture: ComponentFixture<InfoDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
