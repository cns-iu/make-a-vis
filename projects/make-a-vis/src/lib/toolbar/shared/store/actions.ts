import { Action } from '@ngrx/store';

import {
  SaveProjectEvent,
  LoadProjectEvent,
  NewProjectEvent,
  ExportProjectEvent,
  ShareProjectEvent,
  ToggleLoggingEvent
 } from '../events';

export enum SidenavActionTypes {
  SaveProject = '[UI] Save Project',
  LoadProject = '[UI] Load Project',
  NewProject = '[UI] New Project',
  ExportProject = '[UI] Export Project',
  ShareProject = '[UI] Share Project',
  ToggleLogging = '[UI] Toggle Logging'
}

export class SaveProjectAction implements Action {
  readonly type = SidenavActionTypes.SaveProject;
  constructor(public payload?: SaveProjectEvent) {
  }
}

export class LoadProjectAction implements Action {
  readonly type = SidenavActionTypes.LoadProject;
  constructor(public payload?: LoadProjectEvent) {
  }
}

export class NewProjectAction implements Action {
  readonly type = SidenavActionTypes.NewProject;
  constructor(public payload?: NewProjectEvent) {
  }
}

export class ExportProjectAction implements Action {
  readonly type = SidenavActionTypes.ExportProject;
  constructor(public payload?: ExportProjectEvent) {
  }
}

export class ShareProjectAction implements Action {
  readonly type = SidenavActionTypes.ShareProject;
  constructor(public payload?: ShareProjectEvent) {
  }
}

export class ToggleLoggingAction implements Action {
  readonly type = SidenavActionTypes.ToggleLogging;
  constructor(public payload?: ToggleLoggingEvent) {
  }
}
