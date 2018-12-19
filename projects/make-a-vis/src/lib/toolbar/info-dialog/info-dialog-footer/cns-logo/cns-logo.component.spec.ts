import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnsLogoComponent } from './cns-logo.component';

describe('CnsLogoComponent', () => {
  let component: CnsLogoComponent;
  let fixture: ComponentFixture<CnsLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnsLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
