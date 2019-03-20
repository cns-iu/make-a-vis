import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DvlFwVisualizationComponent, GraphicSymbol, GraphicVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { MockComponents } from 'ng-mocks';

import { GraphicVariableIconComponent } from './graphic-variable-icon.component';

describe('GraphicVariableIconComponent', () => {
  let component: GraphicVariableIconComponent;
  let fixture: ComponentFixture<GraphicVariableIconComponent>;
  const graphicVariable: GraphicVariable = {
    id: 'graphicVariableId',
    label: 'graphicVariableLabel',
    type: 'graphicVariableType',
    selector: 'graphicVariableSelector',
    recordStream: undefined,
    recordSet: undefined,
    dataVariable: undefined,
    asBoundField: undefined,
    toJSON: undefined
  };
  const graphicSymbol: GraphicSymbol = {
    id : 'id',
    type: 'type',
    recordStream: undefined,
    graphicVariables:  { 'graphicVariableId': graphicVariable },
    toJSON: undefined
  };
  const mockComponents = MockComponents(DvlFwVisualizationComponent);
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicVariableIconComponent ].concat(mockComponents),
      providers: mockedProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicVariableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create icon on initialization', () => {
    const spy  = spyOn(component, 'createIcon');
    component.ngOnInit();
    // To have been called test because createIcon has been tested as another test case
    expect(spy).toHaveBeenCalled();
  });

  it('should create icon on changes', () => {
    const spy  = spyOn(component, 'createIcon');
    component.ngOnChanges(undefined);
    // To have been called test because createIcon has been tested as another test case
    expect(spy).toHaveBeenCalled();
  });

  it('should create not create icon when visualization is not available', () => {
    component.visualization = undefined;
    component.createIcon();
    expect(component.graphicVariable).toBeUndefined();
  });

  it('should create not create icon when graphic symbol is not available', () => {
    component.visualization = {
      graphicSymbols : {
        'graphicSymbolPresent': graphicSymbol
      },
      id: undefined,
      template: undefined,
      properties: undefined,
      toJSON: undefined
    };
    component.graphicSymbolOption = {
      id: 'graphiSymbolAbsent',
      type: undefined,
      recordStream: undefined,
      graphicVariables: { 'graphicVariableId': graphicVariable },
      toJSON: undefined
    };
    component.createIcon();
    expect(component.graphicVariable).toBeUndefined();
  });

  it('should create create icon when graphic symbol is available', () => {
    component.visualization = {
      graphicSymbols: {
        'graphicSymbolPresent': graphicSymbol
      },
      id: undefined,
      template: undefined,
      properties: undefined,
      toJSON: undefined
    };
    component.graphicSymbolOption = {
      id: 'graphicSymbolPresent',
      type: 'graphicSymbolType',
      recordStream: undefined,
      graphicVariables:  { 'graphicVariableId': graphicVariable },
      toJSON: undefined
    };
    component.graphicVariableOption = {
      id: 'graphicVariableId',
      type: 'graphicVariableOptionType',
      label: 'graphicVariableOptionLabel',
      visualization: 'graphicVariableOptionVisualization',
      staticVisualization: 'graphicVariableStaticVisualization'
    };
    component.createIcon();
    expect(component.graphicVariable).toBeDefined();
    expect(component.graphicVariable.id).toBe('graphicVariableId');
    expect(component.graphicVariable.label).toBe('graphicVariableLabel');
    expect(component.graphicVariable.type).toBe('graphicVariableType');
  });
});
