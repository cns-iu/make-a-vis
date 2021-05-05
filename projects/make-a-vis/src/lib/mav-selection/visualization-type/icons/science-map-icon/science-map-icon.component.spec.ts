import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceMapIconComponent } from './science-map-icon.component';

describe('ScienceMapIconComponent', () => {
  let component: ScienceMapIconComponent;
  let fixture: ComponentFixture<ScienceMapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceMapIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceMapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
