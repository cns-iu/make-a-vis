import * as store from '@ngrx/store';

import * as fromUi from '../../toolbar/shared/store/';
import { ApplicationState, INITIAL_APPLICATION_STATE } from './state';

import { sidenavStateReducer } from '../../toolbar/shared/store/reducer';
import { visualizationStateReducer } from '../../visualization-view/shared/store/reducer';

export const getUiState = store.createFeatureSelector<ApplicationState, fromUi.SidenavState>(
  'ui'
);

export const getSaveProjectState = store.createSelector(
  getUiState,
  fromUi.getSaveProjectState // for demo purpose
);

export const reducers: store.ActionReducerMap<ApplicationState> = {
  ui: sidenavStateReducer,
  visualization: visualizationStateReducer
};
