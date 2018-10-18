import {
  createSelector,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import { assign, pick } from 'lodash';

import { SidenavState, INITIAL_SIDENAV_STATE } from './state';
import { SidenavActionTypes, SidenavActionsUnion } from './actions';

import { Project } from 'dvl-fw';

export function sidenavStateReducer (
  state: SidenavState = INITIAL_SIDENAV_STATE,
  action: SidenavActionsUnion
) {
    const newState: SidenavState = assign({}, state);

    switch (action.type)  {
      case SidenavActionTypes.SaveProjectStarted:
        newState.savingProject = action.payload;
        return newState;

      case SidenavActionTypes.SaveProjectFileCreated:
        newState.outgoingProjectFile = action.payload;
        return newState;

      case SidenavActionTypes.SaveProjectCompleted:
        assign(newState, pick(action.payload, ['savingProject', 'project']));
        return newState;

      case SidenavActionTypes.LoadProjectStarted:
        assign(newState, pick(action.payload, ['loadingProject', 'filename', 'fileExtension']));
        return newState;

      case SidenavActionTypes.LoadProjectCompleted:
        assign(newState, pick(action.payload, ['loadingProject', 'incomingDataFile', 'incomingDataFileType', 'project']));
        return newState;

      case SidenavActionTypes.LoadProjectError:
        assign(newState, pick(action.payload, ['errorOccurred', 'errorMessage', 'errorTitle']));
        return newState;

      case SidenavActionTypes.ExportSnapshotStarted:
        newState.exportingSnapshot = action.payload;
        return newState;

      case SidenavActionTypes.ExportSnapshotCompleted:
        assign(newState, pick(action.payload, ['exportingSnapshot', 'snapshotFile', 'snapshotFileType']));
        return newState;

      case SidenavActionTypes.ExportSnapshotError:
        assign(newState, pick(action.payload, ['errorOccurred', 'errorMessage', 'errorTitle']));
        return newState;

      case SidenavActionTypes.LoadShareUrlStarted:
        newState.loadingShareUrl = action.payload;
        return newState;

      case SidenavActionTypes.LoadShareUrlCompleted:
        assign(newState, pick(action.payload, ['loadingShareUrl', 'project']));
        return newState;

      case SidenavActionTypes.LoadShareUrlError:
        assign(newState, pick(action.payload, ['errorOccurred', 'errorMessage', 'errorTitle']));
        return newState;

      case SidenavActionTypes.CreateShareUrlStarted:
        newState.creatingShareUrl = action.payload;
        return newState;

      case SidenavActionTypes.CreateShareUrlCompleted:
        assign(newState, pick(action.payload, ['shareUrl', 'creatingShareUrl', 'project']));
        return newState;

      case SidenavActionTypes.CreateShareUrlError:
        assign(newState, pick(action.payload, ['errorOccurred', 'errorMessage', 'errorTitle']));
        return newState;

      case SidenavActionTypes.ToggleLogging:
        newState.loggingEnabled = action.payload;
        return newState;

      case SidenavActionTypes.SetActiveVisualization:
        newState.activeVisualization = action.payload;
        return newState;

      case SidenavActionTypes.AddNewVisualization:
        if (state.project) {
          newState.project.visualizations = state.project.visualizations.concat(action.payload);
        }
        return newState;

      case SidenavActionTypes.RemoveVisualization:
        if (state.project) {
          newState.project.visualizations = state.project.visualizations.slice();
          newState.project.visualizations.splice(action.payload, 1);
        }
        return newState;

      case SidenavActionTypes.SetRecordStream:
        if (state.project) {
          const { slot, symbol, visualization } = action.payload;
          if (symbol) {
            visualization.graphicSymbols[slot] = symbol;
          } else {
            delete visualization.graphicSymbols[slot];
          }
        }
        return newState;

      case SidenavActionTypes.SetGraphicSymbolRecordSet:
        assign(newState, pick(action.payload, ['graphicSymbol', 'recordSet']));
        return newState;

      // case SidenavActionTypes.SetGraphicSymbolRecordSet:
      //   return newState;

      // case SidenavActionTypes.SetGraphicVariable:
      //   return newState;

      default:
        return state;
    }
}

export const selectSelfFeature: MemoizedSelector<object, SidenavState> = createFeatureSelector<SidenavState>('ui');

/* selectors */
export const getLoadedProject = (state: SidenavState): Project => state.project;
export const getLoadedProjectSelector = createSelector<SidenavState, SidenavState, Project>(
  selectSelfFeature,
  getLoadedProject
);

export const getLoadingProjectCompleted = (state: SidenavState): boolean => state.loadingProject;
export const getLoadingProjectCompletedSelector = createSelector<SidenavState, SidenavState, boolean>(
  selectSelfFeature,
  getLoadingProjectCompleted
);


export const getLoggingToggleState = (state: SidenavState): boolean => state.loggingEnabled;
export const getLoggingToggleSelector = createSelector<SidenavState, SidenavState, boolean>(
  selectSelfFeature,
  getLoggingToggleState
);
