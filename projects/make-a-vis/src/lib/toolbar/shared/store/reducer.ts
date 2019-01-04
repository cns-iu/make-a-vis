// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import {
  createSelector,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import { assign, pick } from 'lodash';

import { Project, RecordStream, GraphicVariable } from '@dvl-fw/core';
import { INITIAL_SIDENAV_STATE, SidenavState } from './state';
import { SidenavActionTypes, SidenavActionsUnion } from './actions';

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
        assign(newState, pick(action.payload, ['loadingShareUrl', 'project', 'loadingComplete']));
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
          newState.project.visualizations = state.project.visualizations.concat(action.payload.visualization);
        }
        return newState;

      case SidenavActionTypes.RemoveVisualization:
        if (state.project) {
          newState.project.visualizations = state.project.visualizations.slice();
          newState.project.visualizations.splice(action.payload.visualizationIndex, 1);
        }
        return newState;

      case SidenavActionTypes.SetRecordStream:
        if (state.project) {
          const { slot, symbol, visualization } = action.payload;
          if (symbol) {
            visualization.graphicSymbols[slot] = symbol;
            if (!state.project.graphicSymbols.find((s) => s.id === symbol.id)) {
              state.project.graphicSymbols.push(symbol);
            }
          } else {
            delete visualization.graphicSymbols[slot];
          }
        }
        return newState;

      case SidenavActionTypes.UnsetRecordStream:
        if (state.project) {
          const { slot, visualization } = action.payload;
          delete visualization.graphicSymbols[slot];
        }
        return newState;

      case SidenavActionTypes.SetGraphicSymbolRecordSet:
        assign(newState, pick(action.payload, ['graphicSymbol', 'recordSet']));
        return newState;

      case SidenavActionTypes.SetGraphicVariable:
        if (state.project) {
          const { id, slot, variable, visualization } = action.payload;
          visualization.graphicSymbols[slot].graphicVariables[id] = variable;
        }
        return newState;

      case SidenavActionTypes.UnsetGraphicVariable:
        if (state.project) {
          const { id, slot, visualization } = action.payload;
          delete visualization.graphicSymbols[slot].graphicVariables[id];
        }
        return newState;

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

export const getRecordStreams = (state: SidenavState): RecordStream[] => {
  if (state.project && state.project.dataSources) {
    return state.project.dataSources
      .map(source => source.recordStreams)
      .reduce((acc, s) => acc.concat(s), [] as RecordStream[]);
  }
};
export const getRecordStreamsSelector = createSelector<SidenavState, SidenavState, RecordStream[]>(
  selectSelfFeature,
  getRecordStreams
);

export const getAvailableGraphicVariables = (state: SidenavState): GraphicVariable[] => {
  if (state.project && state.project.graphicVariables) {
    return state.project.graphicVariables;
  }
};
export const getAvailableGraphicVariablesSelector = createSelector<SidenavState, SidenavState, GraphicVariable[]>(
  selectSelfFeature,
  getAvailableGraphicVariables
);

export const getLoadingProjectCompleted = (state: SidenavState): boolean => state.loadingProject;
export const getLoadingProjectCompletedSelector = createSelector<SidenavState, SidenavState, boolean>(
  selectSelfFeature,
  getLoadingProjectCompleted
);

export const getLoadingShareUrlCompleted = (state: SidenavState): boolean => state.loadingComplete;
export const getLoadingShareUrlCompletedSelector = createSelector<SidenavState, SidenavState, boolean>(
  selectSelfFeature,
  getLoadingShareUrlCompleted
);

export const getLoggingToggleState = (state: SidenavState): boolean => state.loggingEnabled;
export const getLoggingToggleSelector = createSelector<SidenavState, SidenavState, boolean>(
  selectSelfFeature,
  getLoggingToggleState
);
