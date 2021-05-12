import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsfLogoComponent } from './nsf-logo.component';

describe('NsfLogoComponent', () => {
  let component: NsfLogoComponent;
  let fixture: ComponentFixture<NsfLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsfLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsfLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
