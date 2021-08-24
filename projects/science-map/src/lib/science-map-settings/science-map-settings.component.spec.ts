import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SienceMapSettingsComponent } from './science-map-settings.component';

describe('SienceMapSettingsComponent', () => {
  let component: SienceMapSettingsComponent;
  let fixture: ComponentFixture<SienceMapSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SienceMapSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SienceMapSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
