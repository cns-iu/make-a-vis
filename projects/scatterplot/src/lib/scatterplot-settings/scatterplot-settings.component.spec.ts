import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotSettingsComponent } from './scatterplot-settings.component';

describe('scatterplotSettingsComponent', () => {
  let component: ScatterplotSettingsComponent;
  let fixture: ComponentFixture<ScatterplotSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterplotSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterplotSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
