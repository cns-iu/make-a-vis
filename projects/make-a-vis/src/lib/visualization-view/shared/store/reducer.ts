import { VisualizationState, INITIAL_VISUALIZATION_STATE } from './state';

import { VisualizationActionTypes } from './actions';

export function visualizationStateReducer (
  state: VisualizationState = INITIAL_VISUALIZATION_STATE,
  action: any
) {

    let newState: VisualizationState = null;

    switch (action) {
      case VisualizationActionTypes.NewVisualization:
        newState = Object.assign({cows: 'view-moo'}, state);
        return newState;

      case VisualizationActionTypes.NewDatasource:
        newState = Object.assign({}, state);
        return newState;

      case VisualizationActionTypes.NewRecordStream:
        newState = Object.assign({}, state);
        return newState;
    }
}
