import { MavSelectionActionTypes, MavSelectionActionUnion } from './actions';
import { MavSelectionState, initialMavSelectionState } from './state';

export function mavSelectionStateReducer(
  state: MavSelectionState = initialMavSelectionState,
  action: MavSelectionActionUnion
): MavSelectionState {
  switch (action.type) {
    case MavSelectionActionTypes.GVPanelOpened:
      return { ...state, gvPanelOpen: true };

    case MavSelectionActionTypes.GVPanelClosed:
      return { ...state, gvPanelOpen: false, openedGVGroups: [] };

    case MavSelectionActionTypes.GVGroupPanelOpened: {
      return {
        ...state,
        openedGVGroups: state.openedGVGroups.concat(action.payload)
      };
    }

    case MavSelectionActionTypes.GVGroupPanelClosed: {
      const id = action.payload.gsId;
      return {
        ...state,
        openedGVGroups: state.openedGVGroups.filter(({ gsId }) => id !== gsId)
      };
    }

    case MavSelectionActionTypes.GVGroupPanelStreamChange: {
      const id = action.payload.gsId;
      return {
        ...state,
        openedGVGroups: state.openedGVGroups.map(item => {
          return item.gsId === id ? action.payload : item;
        })
      };
    }
  }

  return state;
}
