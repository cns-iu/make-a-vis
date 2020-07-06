import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceMapComponent } from './science-map.component';

describe('ScienceMapComponent', () => {
  let component: ScienceMapComponent;
  let fixture: ComponentFixture<ScienceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScienceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
