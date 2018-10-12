import { Action } from '@ngrx/store';
import { Visualization, GraphicVariable, DataVariable, GraphicSymbol, RecordSet } from 'dvl-fw';

export interface SetGraphicSymbolRecordSetPayload {
  graphicSymbol: GraphicSymbol;
  recordSet: RecordSet;
}

export enum VisualizationActionTypes {
  SetActiveVisualization = '[UI] Set Active Visualization',
  AddNewVisualization = '[UI] Add New Visualization',
  RemoveVisualization = '[UI] Remove Visualization',

  SetGraphicSymbolRecordSet = '[UI] Set Graphic Symbol Record Set',
  SetActiveDataVariable = '[UI] Set Active Data Variable',
  SetGraphicVariable = '[UI] Set Graphic Variable',
}

export class SetActiveVisualization implements Action {
  readonly type = VisualizationActionTypes.SetActiveVisualization;
  constructor(public payload: number) { }
}

export class AddNewVisualization implements Action {
  readonly type = VisualizationActionTypes.AddNewVisualization;
  constructor(public payload: Visualization) { }
}

export class RemoveVisualization implements Action {
  readonly type = VisualizationActionTypes.RemoveVisualization;
  constructor(public payload: number) { }
}

export class SetGraphicSymbolRecordSet implements Action {
  readonly type = VisualizationActionTypes.SetGraphicSymbolRecordSet;
  constructor(public payload: SetGraphicSymbolRecordSetPayload) {
  }
}

export class SetActiveDataVariable implements Action {
  readonly type = VisualizationActionTypes.SetActiveDataVariable;
  constructor(public payload: DataVariable) {
  }
}

export class SetGraphicVariable implements Action {
  readonly type = VisualizationActionTypes.SetGraphicVariable;
  constructor(public payload: GraphicVariable) {
  }
}


export type VisualizationActionsUnion = SetActiveVisualization | AddNewVisualization | RemoveVisualization |
  SetGraphicSymbolRecordSet | SetActiveDataVariable | SetGraphicVariable;
