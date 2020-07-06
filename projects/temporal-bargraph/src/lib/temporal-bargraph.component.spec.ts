import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalBargraphComponent } from './temporal-bargraph.component';

describe('TemporalBargraphComponent', () => {
  let component: TemporalBargraphComponent;
  let fixture: ComponentFixture<TemporalBargraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalBargraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalBargraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
