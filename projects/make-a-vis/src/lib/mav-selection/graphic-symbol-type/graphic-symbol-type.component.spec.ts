import { Provider, SimpleChange } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatCard, MatIcon } from '@angular/material';
import { GraphicSymbol, GraphicSymbolOption, RecordStream } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';

import { MockDirective } from '../../../testing/utility';
import { DataService } from '../../data-view/shared/data.service';
import { DragEndEvent, DragStartEvent } from '../../drag-drop';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { Vis } from '../../shared/types';
import { GraphicSymbolTypeComponent } from './graphic-symbol-type.component';

describe('GraphicSymbolTypeComponent', () => {
  const recordStreams: RecordStream[] = [
    { id : 'mockId', label: 'mockRecord', asObservable: undefined, toJSON: undefined},
  ];
  const graphicSymbolId = 'graphicSymbolId';
  const graphicSymbolLabel = 'graphicSymbolLabel';
  const graphicSymbolType = 'graphicSymbolType';
  let store: MockStore<any>;
  let dataService: DataService;
  let updateService: UpdateVisService;
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockComponents = MockComponents(
      MatIcon,
      MatCard
  );
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore}
  ];

  // https://stackoverflow.com/questions/49288024/how-to-mock-ngrx-selector-in-a-component
  const createComponent = (): GraphicSymbolTypeComponent => {
    const fixture = TestBed.createComponent(GraphicSymbolTypeComponent);
    const component = fixture.componentInstance;
    const graphicSymbolOptions: GraphicSymbolOption[] = [{
      graphicVariableOptions: undefined,
      id: graphicSymbolId,
      label: graphicSymbolLabel,
      type: graphicSymbolType
    }];
    const graphicSymbol: GraphicSymbol = {
      id : 'id',
      type: 'type',
      recordStream: recordStreams[0],
      graphicVariables: undefined,
      toJSON: undefined
    };
    const activeVis: Vis = {
      data: {
        id: 'id',
        template: 'template',
        properties: undefined,
        graphicSymbols: { 'graphicKey' : graphicSymbol },
        graphicSymbolOptions: graphicSymbolOptions,
        toJSON: () => {}
      },
      label: 'label'
    };
    fixture.detectChanges();
    component.activeVis = activeVis;
    component.selectedRecordStreamMapping = new Map();
    return component;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ mockedProviders ],
      declarations: [
        GraphicSymbolTypeComponent,
        MockDirective({
          selector: '[mavDraggable]',
          inputs: ['mavDraggable', 'zone', 'dropEffect']
        })
      ].concat(mockComponents)
    })
    .compileComponents();
    store = TestBed.get(Store);
    dataService = TestBed.get(DataService);
    updateService = TestBed.get(UpdateVisService);
  }));

  it('should create', async () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should create record streams', () => {
    const storeSpy  = spyOn(store, 'pipe').and.returnValue(of(recordStreams));
    dataService.dataSources = [{
      streamId: 'mockId',
      level: 1,
      id: 'id',
      children: undefined,
      childrenHidden: undefined,
      columns: undefined,
      hidden: undefined,
      parent: undefined,
      label: undefined,
      data: undefined,
      hiddenData: undefined,
      numRows: undefined
    }];
    const component = createComponent();
    expect(storeSpy).toHaveBeenCalled();
    expect(component.heirarchicalRecordStreams.length).toBeGreaterThan(0);
    expect(component.heirarchicalRecordStreams[0].level).toBe(1);
  });

  it('should set the graphic symbol options on change', () => {
    const component = createComponent();
    component.ngOnChanges({ activeVis: new SimpleChange(undefined, component.activeVis.data, false)});
    expect(component).toBeTruthy();
    expect(component.graphicSymbolOptions.length).toBe(1);
    expect(component.graphicSymbolOptions[0].id).toBe(graphicSymbolId);
    expect(component.graphicSymbolOptions[0].label).toBe(graphicSymbolLabel);
    expect(component.graphicSymbolOptions[0].type).toBe(graphicSymbolType);
  });

  it('should clear the selections', () => {
    const component = createComponent();
    component.clear();
    expect(component.graphicSymbolOptions.length).toBe(0);
    expect(component.heirarchicalRecordStreams.length).toBe(0);
    expect(component.selectionClass).toBe('');
  });

  it('should set the record when it is dropped', () => {
    spyOn(updateService, 'updateGraphicSymbol');
    const graphicSymbolOption: GraphicSymbolOption = {
      graphicVariableOptions: undefined,
      id: graphicSymbolId,
      label: graphicSymbolLabel,
      type: graphicSymbolType
    };
    const component = createComponent();
    component.recordStreamDropped(recordStreams[0], graphicSymbolOption);
    expect(component.selectedRecordStreamMapping.get(graphicSymbolId)).toEqual(recordStreams[0]);
  });

  it('should unset the record stream', () => {
    spyOn(updateService, 'unsetRecordStream');
    const component = createComponent();
    component.unsetRecordStream(graphicSymbolId);
    expect(component.selectedRecordStreamMapping.has(graphicSymbolId)).toBeFalsy();
  });

  it('should capitalize the string', () => {
    const component = createComponent();
    const capitalize = component.capitalize('small_BIG');
    expect(capitalize).toBe('Small_big');
  });

  it('should set the class when dragging starts', () => {
    const dragdropEvent: DragStartEvent = {
      type: 'drag-start',
      zone: undefined,
      data: undefined,
      accepted: true
    };
    const component = createComponent();
    component.onDragDropEvent(dragdropEvent);
    expect(component.selectionClass).toBe('selectable');
  });

  it('should set the class when dragging starts and is not selectable', () => {
    const dragdropEvent: DragStartEvent = {
      type: 'drag-start',
      zone: undefined,
      data: undefined,
      accepted: false
    };
    const component = createComponent();
    component.onDragDropEvent(dragdropEvent);
    expect(component.selectionClass).toBe('unselectable');
  });

  it('should set the class when dragging ends', () => {
    const dragdropEvent: DragEndEvent = {
      type: 'drag-end',
      zone: undefined,
      data: undefined,
      canceled: true
    };
    const component = createComponent();
    component.onDragDropEvent(dragdropEvent);
    expect(component.selectionClass).toBe('');
  });

  it('should set record streams', () => {
    const component = createComponent();
    component.setRecordStreams();
    expect(component.selectedRecordStreamMapping.has('graphicKey')).toBeTruthy();
    expect(component.selectedRecordStreamMapping.get('graphicKey')).toEqual(recordStreams[0]);
  });
});
