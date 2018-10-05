import { Action } from '@ngrx/store';
import { Visualization } from 'dvl-fw';

// import { DataSource, Visualization, RecordStream } from 'dvl-fw';

export enum VisualizationActionTypes {
  SetActiveVisualization = '[VIS] Set Active Visualization',
  AddNewVisualization = '[VIS] Add New Visualization',
  RemoveVisualization = '[VIS] Remove Visualization',

  SetGraphicSymbolRecordSet = '[VIS] Set Graphic Symbol Record Set',
  SetActiveDataVariable = '[VIS] Set Active Data Variable',
  SetGraphicVariable = '[VIS] Set Graphic Variable',
}

export class SetActiveVisualization implements Action {
  readonly type = VisualizationActionTypes.SetActiveVisualization;
  constructor(public index: number) { }
}

export class AddNewVisualization implements Action {
  readonly type = VisualizationActionTypes.AddNewVisualization;
  constructor(public visualization: Visualization) { }
}

export class RemoveVisualization implements Action {
  readonly type = VisualizationActionTypes.RemoveVisualization;
  constructor(public index: number) { }
}

export class SetGraphicSymbolRecordSet implements Action {
  readonly type = VisualizationActionTypes.SetGraphicSymbolRecordSet;
  constructor(public payload = {}) { }
}

export class SetActiveDataVariable implements Action {
  readonly type = VisualizationActionTypes.SetActiveDataVariable;
  constructor(public payload = {}) { }
}

export class SetGraphicVariable implements Action {
  readonly type = VisualizationActionTypes.SetGraphicVariable;
  constructor(public payload = {}) { }
}

export type VisualizationAction = SetActiveVisualization | AddNewVisualization | RemoveVisualization;
