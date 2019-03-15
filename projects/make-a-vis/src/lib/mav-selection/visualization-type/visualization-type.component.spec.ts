import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material';
import { MockComponents } from 'ng-mocks';

import { GeomapIconComponent } from './icons/geomap-icon/geomap-icon.component';
import { NetworkIconComponent } from './icons/network-icon/network-icon.component';
import { ScatterGraphIconComponent } from './icons/scatter-graph-icon/scatter-graph-icon.component';
import { ScienceMapIconComponent } from './icons/science-map-icon/science-map-icon.component';
import { TemporalBargraphIconComponent } from './icons/temporal-bargraph-icon/temporal-bargraph-icon.component';
import { VisualizationTypeComponent } from './visualization-type.component';

describe('VisualizationTypeComponent', () => {
  let component: VisualizationTypeComponent;
  let fixture: ComponentFixture<VisualizationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisualizationTypeComponent,
        MockComponents(
          GeomapIconComponent,
          MatCard,
          NetworkIconComponent,
          ScatterGraphIconComponent,
          ScienceMapIconComponent,
          TemporalBargraphIconComponent
        )
      ]
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
