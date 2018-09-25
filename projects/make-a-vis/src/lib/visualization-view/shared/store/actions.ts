import { Action } from '@ngrx/store';

// import { DataSource, Visualization, RecordStream } from 'dvl-fw';

export enum VisualizationActionTypes {
  SetActiveVisualization = '[VIS] Set Active Visualization',
  AddNewVisualization = '[VIS] Add New Visualization',
  SetGraphicSymbolRecordSet = '[VIS] Set Graphic Symbol Record Set',

  SetActiveDataVariable = '[VIS] Set Active Data Variable',
  SetGraphicVariable = '[VIS] Set Graphic Variable',
}

export class SetActiveVisualization implements Action {
  readonly type = VisualizationActionTypes.SetActiveVisualization;
  constructor(public payload = {}) {
  }
}

export class AddNewVisualization implements Action {
  readonly type = VisualizationActionTypes.AddNewVisualization;
  constructor(public payload = {}) {
  }
}

export class SetGraphicSymbolRecordSet implements Action {
  readonly type = VisualizationActionTypes.SetGraphicSymbolRecordSet;
  constructor(public payload = {}) {
  }
}

export class SetActiveDataVariable implements Action {
  readonly type = VisualizationActionTypes.SetActiveDataVariable;
  constructor(public payload = {}) {
  }
}

export class SetGraphicVariable implements Action {
  readonly type = VisualizationActionTypes.SetGraphicVariable;
  constructor(public payload = {}) {
  }
}
