import { VisualizationState, INITIAL_VISUALIZATION_STATE } from './state';
import { VisualizationActionTypes, VisualizationActionsUnion } from './actions';

import { assign, pick } from 'lodash';

export function visualizationStateReducer (
  state: VisualizationState = INITIAL_VISUALIZATION_STATE,
  action: VisualizationActionsUnion
) {

    const newState: VisualizationState = assign({}, state);

    switch (action.type) {
      case VisualizationActionTypes.SetActiveVisualization:
        newState.activeVisualization = action.payload;
        return newState;

      case VisualizationActionTypes.AddNewVisualization:
        newState.activeVisualization = action.payload;
        return newState;

      case VisualizationActionTypes.SetGraphicSymbolRecordSet:
        assign(newState, pick(action.payload, ['graphicSymbol', 'recordSet']));
        return newState;

      case VisualizationActionTypes.SetActiveDataVariable:
        newState.activeDataVariable = action.payload;
        return newState;

      case VisualizationActionTypes.SetGraphicVariable:
        // TODO
        return newState;

      default:
        return state;
    }
}
