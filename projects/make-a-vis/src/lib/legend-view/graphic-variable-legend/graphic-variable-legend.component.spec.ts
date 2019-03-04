import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicVariableLegendComponent } from './graphic-variable-legend.component';

describe('GraphicVariableLegendComponent', () => {
  let component: GraphicVariableLegendComponent;
  let fixture: ComponentFixture<GraphicVariableLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicVariableLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicVariableLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
