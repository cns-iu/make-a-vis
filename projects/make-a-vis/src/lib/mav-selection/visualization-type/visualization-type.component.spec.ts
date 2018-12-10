import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationTypeComponent } from './visualization-type.component';

describe('VisualizationTypeComponent', () => {
  let component: VisualizationTypeComponent;
  let fixture: ComponentFixture<VisualizationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
