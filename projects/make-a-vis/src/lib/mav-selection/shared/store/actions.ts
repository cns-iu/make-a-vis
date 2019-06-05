import { Action } from '@ngrx/store';

import { GVGroupPanelPayload } from './payload-types';

/**
 * Action types for mav-selection
 */
export enum MavSelectionActionTypes {
  GVPanelOpened = '[MavSelection] Graphic Variable Panel Opened',
  GVPanelClosed = '[MavSelection] Graphic Variable Panel Closed',
  GVGroupPanelOpened = '[MavSelection] Graphic Variable Group Panel Opened',
  GVGroupPanelClosed = '[MavSelection] Graphic Variable Group Panel Closed',
  GVGroupPanelStreamChange = '[MavSelection] Graphic Variable Group Panel Stream Changed',
  AdvancedToggle = '[MavSelection] Advanced Options Toggle',
}

export class AdvancedToggle implements Action {
  readonly type = MavSelectionActionTypes.AdvancedToggle;
  constructor(readonly payload: boolean) {}
}

/**
 * Action class for graphic-variable panel opened action
 */
export class GVPanelOpened implements Action {
  readonly type = MavSelectionActionTypes.GVPanelOpened;
  readonly payload: {} = {};
}

/**
 * Action class for graphic-variable panel closed action
 */
export class GVPanelClosed implements Action {
  readonly type = MavSelectionActionTypes.GVPanelClosed;
  readonly payload: {} = {};
}

/**
 * Action class for graphic-variable group panel opened action
 */
export class GVGroupPanelOpened implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelOpened;
  constructor(readonly payload: GVGroupPanelPayload) { }
}

/**
 * Action class for graphic-variable group panel closed action
 */
export class GVGroupPanelClosed implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelClosed;
  constructor(readonly payload: GVGroupPanelPayload) { }
}

/**
 * Action class for graphic-variable group panel stream change action
 */
export class GVGroupPanelStreamChange implements Action {
  readonly type = MavSelectionActionTypes.GVGroupPanelStreamChange;
  constructor(readonly payload: GVGroupPanelPayload) { }
}

/**
 * Union of all action classes
 */
export type MavSelectionActionUnion =
  GVPanelOpened | GVPanelClosed |
  GVGroupPanelOpened | GVGroupPanelClosed |
  GVGroupPanelStreamChange | AdvancedToggle;
