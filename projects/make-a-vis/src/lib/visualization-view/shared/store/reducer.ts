import { VisualizationState, INITIAL_VISUALIZATION_STATE } from './state';

import { VisualizationActionTypes } from './actions';

export function visualizationStateReducer (
  state: VisualizationState = INITIAL_VISUALIZATION_STATE,
  action: any
) {

    const newState: VisualizationState = Object.assign({}, state);

    switch (action) {
      case VisualizationActionTypes.SetActiveVisualization:
        newState.activeVisualization = action.payload;
        return newState;

      case VisualizationActionTypes.AddNewVisualization:
        newState.activeVisualization = action.payload;
        return newState;

      case VisualizationActionTypes.SetGraphicSymbolRecordSet:
        return newState;

      case VisualizationActionTypes.SetActiveDataVariable:
        newState.activeDataVariable = action.payload;
        return newState;

      case VisualizationActionTypes.SetGraphicVariable:
        //
        return newState;

      default:
        return state;
    }
}
