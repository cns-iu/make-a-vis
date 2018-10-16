import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipbrdLogoComponent } from './clipbrd-logo.component';

describe('ClipbrdLogoComponent', () => {
  let component: ClipbrdLogoComponent;
  let fixture: ComponentFixture<ClipbrdLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipbrdLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipbrdLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
