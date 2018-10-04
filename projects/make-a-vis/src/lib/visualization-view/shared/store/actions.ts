import { Action } from '@ngrx/store';
import { Visualization, GraphicVariable, DataVariable, GraphicSymbol, RecordSet } from 'dvl-fw';

export interface SetGraphicSymbolRecordSetPayload {
  graphicSymbol: GraphicSymbol;
  recordSet: RecordSet;
}

export enum VisualizationActionTypes {
  SetActiveVisualization = '[VIS] Set Active Visualization',
  AddNewVisualization = '[VIS] Add New Visualization',
  SetGraphicSymbolRecordSet = '[VIS] Set Graphic Symbol Record Set',

  SetActiveDataVariable = '[VIS] Set Active Data Variable',
  SetGraphicVariable = '[VIS] Set Graphic Variable',
}

export class SetActiveVisualization implements Action {
  readonly type = VisualizationActionTypes.SetActiveVisualization;
  constructor(public payload: Visualization) {
  }
}

export class AddNewVisualization implements Action {
  readonly type = VisualizationActionTypes.AddNewVisualization;
  constructor(public payload: Visualization) {
  }
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


export type VisualizationActionsUnion = SetActiveVisualization | AddNewVisualization |
  SetGraphicSymbolRecordSet | SetActiveDataVariable | SetGraphicVariable;
