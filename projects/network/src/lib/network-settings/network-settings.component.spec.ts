import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSettingsComponent } from './network-settings.component';

describe('networkSettingsComponent', () => {
  let component: NetworkSettingsComponent;
  let fixture: ComponentFixture<NetworkSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
