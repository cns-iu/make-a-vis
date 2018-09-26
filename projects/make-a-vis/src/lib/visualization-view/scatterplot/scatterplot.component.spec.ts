import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotComponent } from './scatterplot.component';
import { createStubComponent } from '../../../testing/utility';

describe('ScatterplotComponent', () => {
  let component: ScatterplotComponent;
  let fixture: ComponentFixture<ScatterplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        createStubComponent('dino-scatterplot', {
          inputs: [
            'dataStream', 'pointIdField',
            'xField', 'yField', 'sizeField', 'colorField', 'strokeColorField',
            'shapeField', 'pulseField', 'enableTooltip', 'tooltipTextField',
            'width', 'height', 'autoresize', 'gridlines',
            'showAxisLabels', 'showAxisIndicators'
          ]
        }),
        ScatterplotComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
