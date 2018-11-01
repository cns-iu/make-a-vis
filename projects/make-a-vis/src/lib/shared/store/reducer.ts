// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { Project } from '@dvl-fw/core';
import { ApplicationState } from './state';
import * as fromUi from '../../toolbar/shared/store/';
import { sidenavStateReducer } from '../../toolbar/shared/store/reducer';

export const reducers: ActionReducerMap<ApplicationState> = {
  ui: sidenavStateReducer
};

// get feature state from Application State
export const getUiFeature = createFeatureSelector<ApplicationState, fromUi.SidenavState>(
  'ui'
);

/* selectors */
export const getLoadedProject = createSelector<ApplicationState, fromUi.SidenavState, Project>(
  getUiFeature,
  fromUi.getLoadedProject
);
