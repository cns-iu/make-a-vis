import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardLogoComponent } from './clipboard-logo.component';

describe('ClipboardLogoComponent', () => {
  let component: ClipboardLogoComponent;
  let fixture: ComponentFixture<ClipboardLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipboardLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
