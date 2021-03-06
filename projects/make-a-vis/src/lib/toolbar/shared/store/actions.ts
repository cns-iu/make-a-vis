// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataVariable } from '@dvl-fw/core';
import { Action } from '@ngrx/store';

import * as payloadTypes from './payload-types';

export enum SidenavActionTypes {
  SaveProjectStarted = '[UI] Save Project',
  SaveProjectFileCreated = '[UI] Create Project File',
  SaveProjectCompleted = '[UI] Project Saved',

  LoadProjectStarted = '[UI] Load Project',
  LoadProjectCompleted = '[UI] Project Loaded',
  LoadProjectError = '[UI] Project Load Error',

  ExportSnapshotStarted = '[UI] Export Snapshot',
  ExportSnapshotCreated = '[UI] Export Snapshot Created',
  ExportSnapshotCompleted = '[UI] Export Snapshot Completed',
  ExportSnapshotError = '[UI] Export Snapshot Error',

  LoadShareUrlStarted = '[UI] Load Share URL',
  LoadShareUrlCompleted = '[UI] Load Share URL Completed',
  LoadShareUrlError = '[UI] Load Share URL Error',

  CreateShareUrlStarted = '[UI] Create Share URL',
  CreateShareUrlCompleted = '[UI] Create Share URL Completed',
  CreateShareUrlError = '[UI] Create Share URL Error',

  ToggleLogging = '[UI] Toggle Logging',

  SetActiveVisualization = '[UI] Set Active Visualization',
  AddNewVisualization = '[UI] Add New Visualization',
  RemoveVisualization = '[UI] Remove Visualization',

  SetRecordStream = '[UI] Set Record Stream',
  UnsetRecordStream = '[UI] Unset Record Stream',

  SetGraphicSymbolRecordSet = '[UI] Set Graphic Symbol Record Set',
  SetActiveDataVariable = '[UI] Set Active Data Variable',
  SetGraphicVariable = '[UI] Set Graphic Variable',
  UnsetGraphicVariable = '[UI] Unset Graphic Variable',

  CopyToClipboardSuccess = '[UI] Successfully Copied To Clipboard',
  CopyToClipboardError = '[UI] Copy To Clipboard Failed',

  OpenInfoIcon = '[UI] Info Icon Opened',
  CloseInfoIcon = '[UI] Info Icon Closed'
}


export class SaveProjectStarted implements Action {
  readonly type = SidenavActionTypes.SaveProjectStarted;
  constructor(public payload: boolean) {
  }
}

export class SaveProjectFileCreated implements Action {
  readonly type = SidenavActionTypes.SaveProjectFileCreated;
  constructor(public payload: string) {
  }
}

export class SaveProjectCompleted implements Action {
  readonly type = SidenavActionTypes.SaveProjectCompleted;
  constructor(public payload: payloadTypes.SaveProjectCompletedPayload) {
  }
}

export class LoadProjectStarted implements Action {
  readonly type = SidenavActionTypes.LoadProjectStarted;
  constructor(public payload: payloadTypes.LoadProjectStartedPayload) {
  }
}

export class LoadProjectCompleted implements Action {
  readonly type = SidenavActionTypes.LoadProjectCompleted;
  constructor(public payload: payloadTypes.LoadProjectCompletedPayload) {
  }
}

export class LoadProjectError implements Action {
  readonly type = SidenavActionTypes.LoadProjectError;
  constructor(public payload: payloadTypes.ErrorPayload) {
  }
}

export class ExportSnapshotStarted implements Action {
  readonly type = SidenavActionTypes.ExportSnapshotStarted;
  constructor(public payload: boolean) {
  }
}

export class ExportSnapshotCompleted implements Action {
  readonly type = SidenavActionTypes.ExportSnapshotCompleted;
  constructor(public payload: payloadTypes.ExportSnapshotCompletedPayload) {
  }
}

export class ExportSnapshotError implements Action {
  readonly type = SidenavActionTypes.ExportSnapshotError;
  constructor(public payload: payloadTypes.ErrorPayload) {
  }
}

export class LoadShareUrlStarted implements Action {
  readonly type = SidenavActionTypes.LoadShareUrlStarted;
  constructor(public payload: boolean) {
  }
}

export class LoadShareUrlCompleted implements Action {
  readonly type = SidenavActionTypes.LoadShareUrlCompleted;
  constructor(public payload: payloadTypes.LoadShareUrlCompletedPayload) {
  }
}

export class LoadShareUrlError implements Action {
  readonly type = SidenavActionTypes.LoadShareUrlError;
  constructor(public payload: payloadTypes.ErrorPayload) {
  }
}

export class CreateShareUrlStarted implements Action {
  readonly type = SidenavActionTypes.CreateShareUrlStarted;
  constructor(public payload: boolean) {
  }
}

export class CreateShareUrlCompleted implements Action {
  readonly type = SidenavActionTypes.CreateShareUrlCompleted;
  constructor(public payload: payloadTypes.CreateShareUrlCompletedPayload) {
  }
}

export class CreateShareUrlError implements Action {
  readonly type = SidenavActionTypes.CreateShareUrlError;
  constructor(public payload: payloadTypes.ErrorPayload) {
  }
}

export class ToggleLogging implements Action {
  readonly type = SidenavActionTypes.ToggleLogging;
  constructor(public payload: boolean) {
  }
}

export class SetActiveVisualization implements Action {
  readonly type = SidenavActionTypes.SetActiveVisualization;
  constructor(public payload: payloadTypes.VisualizationGroup) { }
}

export class AddNewVisualization implements Action {
  readonly type = SidenavActionTypes.AddNewVisualization;
  constructor(public payload: payloadTypes.VisualizationGroup) { }
}

export class RemoveVisualization implements Action {
  readonly type = SidenavActionTypes.RemoveVisualization;
  constructor(public payload: payloadTypes.VisualizationGroup) { }
}

export class SetRecordStream implements Action {
  readonly type = SidenavActionTypes.SetRecordStream;
  constructor(public payload: payloadTypes.SetRecordStreamPayload) { }
}

export class UnsetRecordStream implements Action {
  readonly type = SidenavActionTypes.UnsetRecordStream;
  constructor(public payload: payloadTypes.UnsetRecordStreamPayload) { }
}

export class SetGraphicSymbolRecordSet implements Action {
  readonly type = SidenavActionTypes.SetGraphicSymbolRecordSet;
  constructor(public payload: payloadTypes.SetGraphicSymbolRecordSetPayload) {
  }
}

export class SetActiveDataVariable implements Action {
  readonly type = SidenavActionTypes.SetActiveDataVariable;
  constructor(public payload: DataVariable) {
  }
}

export class SetGraphicVariable implements Action {
  readonly type = SidenavActionTypes.SetGraphicVariable;
  constructor(public payload: payloadTypes.SetGraphicVariablePayload) {
  }
}

export class UnsetGraphicVariable implements Action {
  readonly type = SidenavActionTypes.UnsetGraphicVariable;
  constructor(public payload: payloadTypes.UnsetGraphicVariablePayload) {
  }
}

export class CopyToClipboardSuccess implements Action {
  readonly type = SidenavActionTypes.CopyToClipboardSuccess;
  constructor(public payload: payloadTypes.CopyToClipboardSuccessPayload) {}
}

export class CopyToClipboardError implements Action {
  readonly type = SidenavActionTypes.CopyToClipboardError;
  constructor(public payload: payloadTypes.CopyToClipboardErrorPayload) {}
}

export class OpenedInfoIcon implements Action {
  readonly type = SidenavActionTypes.OpenInfoIcon;
  constructor(public payload: payloadTypes.InfoIcon) {}
}

export class ClosedInfoIcon implements Action {
  readonly type = SidenavActionTypes.CloseInfoIcon;
  constructor(public payload: payloadTypes.InfoIcon) {}
}

export type SidenavActionsUnion = SaveProjectStarted | SaveProjectFileCreated | SaveProjectCompleted |
  LoadProjectStarted | LoadProjectCompleted | LoadProjectError |
  ExportSnapshotStarted | ExportSnapshotCompleted | ExportSnapshotError |
  LoadShareUrlStarted | LoadShareUrlCompleted | LoadShareUrlError |
  CreateShareUrlStarted | CreateShareUrlCompleted | CreateShareUrlError |
  ToggleLogging | SetActiveVisualization | AddNewVisualization | RemoveVisualization | SetRecordStream | UnsetRecordStream |
  SetGraphicSymbolRecordSet | SetActiveDataVariable | SetGraphicVariable | UnsetGraphicVariable |
  CopyToClipboardSuccess | CopyToClipboardError | OpenedInfoIcon | ClosedInfoIcon;
