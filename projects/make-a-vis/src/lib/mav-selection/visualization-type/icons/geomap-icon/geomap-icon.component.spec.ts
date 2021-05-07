import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeomapIconComponent } from './geomap-icon.component';

describe('GeomapIconComponent', () => {
  let component: GeomapIconComponent;
  let fixture: ComponentFixture<GeomapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeomapIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeomapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
