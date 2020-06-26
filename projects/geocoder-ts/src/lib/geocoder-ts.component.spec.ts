import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocoderTsComponent } from './geocoder-ts.component';

describe('GeocoderTsComponent', () => {
  let component: GeocoderTsComponent;
  let fixture: ComponentFixture<GeocoderTsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeocoderTsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocoderTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
