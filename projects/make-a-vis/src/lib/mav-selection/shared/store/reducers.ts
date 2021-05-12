import { MavSelectionActionTypes, MavSelectionActionUnion } from './actions';
import { initialMavSelectionState, MavSelectionState } from './state';

/**
 * Mavs selection state reducer
 * @param [state] instance of MavSelectionState
 * @param action Union of all acceptable action type classes
 * @returns the new state
 */
export function mavSelectionStateReducer(
  state: MavSelectionState,
  action: MavSelectionActionUnion
): MavSelectionState {
  state = state || initialMavSelectionState;

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

    case MavSelectionActionTypes.AdvancedToggle: {
      return { ...state, advanced: action.payload };
    }
  }
}
