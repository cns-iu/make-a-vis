import { Action } from '@ngrx/store';
import { GVGroupPanelPayload } from './payload-types';

export enum MavSelectionActionTypes {
  GVPanelOpened = '[MavSelection] Graphic Variable Panel Opened',
  GVPanelClosed = '[MavSelection] Graphic Variable Panel Closed',
  GVGroupPanelOpened = '[MavSelection] Graphic Variable Group Panel Opened',
  GVGroupPanelClosed = '[MavSelection] Graphic Variable Group Panel Closed',
  GVGroupPanelStreamChange = '[MavSelection] Graphic Variable Group Panel Stream Changed'
}

export class GVPanelOpened implements Action {
  readonly type = MavSelectionActionTypes.GVPanelOpened;
  readonly payload: {} = {};
}

export class GVPanelClosed implements Action {
  readonly type = MavSelectionActionTypes.GVPanelClosed;
  readonly payload: {} = {};
}


export class GVGroupPanelOpened implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelOpened;
  constructor(readonly payload: GVGroupPanelPayload) { }
}

export class GVGroupPanelClosed implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelClosed;
  constructor(readonly payload: GVGroupPanelPayload) { }
}

export class GVGroupPanelStreamChange implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelStreamChange;
  constructor(readonly payload: GVGroupPanelPayload) { }
}


export type MavSelectionActionUnion =
  GVPanelOpened | GVPanelClosed |
  GVGroupPanelOpened | GVGroupPanelClosed |
  GVGroupPanelStreamChange;
