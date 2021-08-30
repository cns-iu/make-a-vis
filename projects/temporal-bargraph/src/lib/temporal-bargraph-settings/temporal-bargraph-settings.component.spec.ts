import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalSettingsComponent } from './temporal-bargraph-settings.component';

describe('temporalSettingsComponent', () => {
  let component: TemporalSettingsComponent;
  let fixture: ComponentFixture<TemporalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
