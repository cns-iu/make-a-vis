import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalBargraphIconComponent } from './temporal-bargraph-icon.component';

describe('TemporalBargraphIconComponent', () => {
  let component: TemporalBargraphIconComponent;
  let fixture: ComponentFixture<TemporalBargraphIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalBargraphIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalBargraphIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
