import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DvlFwVisualizationComponent } from '@dvl-fw/angular';
import { Store } from '@ngrx/store';
import { MockComponents } from 'ng-mocks';

import { GraphicVariableLegendComponent } from './graphic-variable-legend.component';

describe('GraphicVariableLegendComponent', () => {
  let component: GraphicVariableLegendComponent;
  let fixture: ComponentFixture<GraphicVariableLegendComponent>;
  const mockComponents = MockComponents(
    MatCardTitle,
    MatCardSubtitle,
    MatCard,
    MatCardContent,
    DvlFwVisualizationComponent
  );
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore}
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicVariableLegendComponent ].concat(mockComponents),
      providers: [mockedProviders]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicVariableLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
