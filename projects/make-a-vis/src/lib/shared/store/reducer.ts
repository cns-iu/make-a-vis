import * as store from '@ngrx/store';

import * as fromUi from '../../toolbar/shared/store/';
import { ApplicationState } from './state';

import { sidenavStateReducer } from '../../toolbar/shared/store/reducer';
import { visualizationStateReducer } from '../../visualization-view/shared/store/reducer';
import { Project } from 'dvl-fw';

export const getUiState = store.createFeatureSelector<ApplicationState, fromUi.SidenavState>(
  'ui'
);

export const getLoadedProject = store.createSelector<ApplicationState, fromUi.SidenavState, Project>(
  getUiState,
  fromUi.getLoadedProject
);

export const reducers: store.ActionReducerMap<ApplicationState> = {
  ui: sidenavStateReducer,
  visualization: visualizationStateReducer
};
