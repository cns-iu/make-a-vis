import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceMapSettingsComponent } from './science-map-settings.component';

describe('SienceMapSettingsComponent', () => {
  let component: ScienceMapSettingsComponent;
  let fixture: ComponentFixture<ScienceMapSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceMapSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceMapSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
