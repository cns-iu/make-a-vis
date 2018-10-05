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
        newState.activeVisualization = action.index;
        return newState;

      case VisualizationActionTypes.AddNewVisualization:
        newState.visualizations = state.visualizations.concat(action.visualization);
        return newState;

      case VisualizationActionTypes.RemoveVisualization:
        newState.visualizations = state.visualizations.slice();
        newState.visualizations.splice(action.index, 1);
        return newState;

      case VisualizationActionTypes.SetGraphicSymbolRecordSet:
        assign(newState, pick(action.payload, ['graphicSymbol', 'recordSet']));
        return newState;

      // case VisualizationActionTypes.SetGraphicSymbolRecordSet:
      //   return newState;

      case VisualizationActionTypes.SetGraphicVariable:
        // TODO
        return newState;

      default:
        return state;
    }
}
