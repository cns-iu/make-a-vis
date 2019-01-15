export interface GVGroupPanelState {
  gsId: string;
  streamId: string;
}

export interface MavSelectionState {
  gvPanelOpen: boolean;
  openedGVGroups: GVGroupPanelState[];
}

export const initialMavSelectionState: MavSelectionState = {
  gvPanelOpen: false,
  openedGVGroups: []
};
