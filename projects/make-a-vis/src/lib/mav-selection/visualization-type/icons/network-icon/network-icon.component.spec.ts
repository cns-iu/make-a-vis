import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkIconComponent } from './network-icon.component';

describe('NetworkIconComponent', () => {
  let component: NetworkIconComponent;
  let fixture: ComponentFixture<NetworkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
