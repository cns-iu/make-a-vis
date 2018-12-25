import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterGraphIconComponent } from './scatter-graph-icon.component';

describe('ScatterGraphIconComponent', () => {
  let component: ScatterGraphIconComponent;
  let fixture: ComponentFixture<ScatterGraphIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterGraphIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterGraphIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
