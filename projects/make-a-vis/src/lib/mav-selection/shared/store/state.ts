/**
 * Graphic-variable-group panel state type
 */
export interface GVGroupPanelState {
  gsId: string;
  streamId: string;
}

/**
 * Mav selection state type
 */
export interface MavSelectionState {
  gvPanelOpen: boolean;
  openedGVGroups: GVGroupPanelState[];
  advanced: boolean;
}

/**
 * initial MavSelectionState
 */
export const initialMavSelectionState: MavSelectionState = {
  gvPanelOpen: false,
  openedGVGroups: [],
  advanced: false
};
