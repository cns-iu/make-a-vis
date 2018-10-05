import { VisualizationState, INITIAL_VISUALIZATION_STATE } from './state';

import { VisualizationAction, VisualizationActionTypes } from './actions';

export function visualizationStateReducer (
  state: VisualizationState = INITIAL_VISUALIZATION_STATE,
  action: VisualizationAction
): VisualizationState {
    const newState: VisualizationState = Object.assign({}, state);

    switch (action.type) {
      case VisualizationActionTypes.SetActiveVisualization:
        newState.activeVisualization = action.index;
        return newState;

      case VisualizationActionTypes.AddNewVisualization:
        newState.visualizations = state.visualizations.concat(action.visualization);
        return newState;

      case VisualizationActionTypes.RemoveVisualization:
        newState.visualizations = state.visualizations.slice();
        newState.visualizations.splice(action.index, 1);
        return newState;

      // case VisualizationActionTypes.SetGraphicSymbolRecordSet:
      //   return newState;

      // case VisualizationActionTypes.SetActiveDataVariable:
      //   newState.activeDataVariable = action.payload;
      //   return newState;

      // case VisualizationActionTypes.SetGraphicVariable:
      //   //
      //   return newState;

      default:
        return state;
    }
}
