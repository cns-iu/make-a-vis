import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeomapSettingsComponent } from './geomap-settings.component';

describe('GeomapSettingsComponent', () => {
  let component: GeomapSettingsComponent;
  let fixture: ComponentFixture<GeomapSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeomapSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeomapSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
