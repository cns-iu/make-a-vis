import { Action } from '@ngrx/store';
import { Project } from 'dvl-fw';
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
  constructor() {
  }
}

export type SidenavActionsUnion = SaveProjectStarted | SaveProjectFileCreated | SaveProjectCompleted |
  LoadProjectStarted | LoadProjectCompleted | LoadProjectError |
  ExportSnapshotStarted | ExportSnapshotCompleted | ExportSnapshotError |
  LoadShareUrlStarted | LoadShareUrlCompleted | LoadShareUrlError |
  CreateShareUrlStarted | CreateShareUrlCompleted | CreateShareUrlError |
  ToggleLogging;

