import * as store from '@ngrx/store';
import { SidenavState, INITIAL_SIDENAV_STATE } from './state';
import { SidenavActionTypes } from './actions';
import { Project } from 'dvl-fw';

export function sidenavStateReducer (
  state: SidenavState = INITIAL_SIDENAV_STATE,
  action: any
) {

  const newState: SidenavState = Object.assign({}, state);

  switch (action.type)  {
    case SidenavActionTypes.SaveProjectStarted:
      newState.savingProject = true; // or action payload
      return newState;

    case SidenavActionTypes.SaveProjectFileCreated:
      newState.outgoingProjectFile = 'outgoing-file.yml';
      return newState;

    case SidenavActionTypes.SaveProjectCompleted:
      newState.savingProject = false;
      newState.project = action.payload;
      return newState;

    case SidenavActionTypes.LoadProjectStarted:
      newState.loadingProject = true;
      newState.incomingDataFile = action.payload.filename;
      newState.incomingDataFileType = action.payload.fileExtension;
      return newState;

    case SidenavActionTypes.LoadProjectCompleted:
      newState.loadingProject = false;
      newState.incomingDataFile = '';
      newState.incomingDataFileType = '';
      newState.project = action.payload;
      return newState;

    case SidenavActionTypes.LoadProjectError:
      newState.errorOccurred = true;
      newState.errorMessage = 'Error Message';
      newState.errorTitle = 'Error Title';
      return newState;

    case SidenavActionTypes.ExportSnapshotStarted:
      newState.exportingSnapshot = true;
      return newState;

    case SidenavActionTypes.ExportSnapshotCreated:
      newState.snapshotFile = 'snapshot-filename.svg'; // or png or pdf
      newState.snapshotFileType = 'svg'; // or png or pdf
      return newState;

    case SidenavActionTypes.ExportSnapshotCompleted:
      newState.exportingSnapshot = false;
      return newState;

    case SidenavActionTypes.ExportSnapshotError:
      newState.errorOccurred = true;
      newState.errorMessage = 'Error Message';
      newState.errorTitle = 'Error Title';
      return newState;

    case SidenavActionTypes.LoadShareUrlStarted:
      newState.loadingShareUrl = true;
      return newState;

    case SidenavActionTypes.LoadShareUrlCompleted:
      newState.loadingShareUrl = false;
      newState.project = action.payload;
      return newState;

    case SidenavActionTypes.LoadShareUrlError:
      newState.errorOccurred = true;
      newState.errorMessage = 'Error Message';
      newState.errorTitle = 'Error Title';
      return newState;

    case SidenavActionTypes.CreateShareUrlStarted:
      newState.creatingShareUrl = true;
      return newState;

    case SidenavActionTypes.CreateShareUrlCompleted:
      newState.shareUrl = 'http://www.cns.iu.edu?share=aBcde';
      newState.creatingShareUrl = false;
      newState.project = action.payload;
      return newState;

    case SidenavActionTypes.CreateShareUrlError:
      newState.errorOccurred = true;
      newState.errorMessage = 'Error Message';
      newState.errorTitle = 'Error Title';
      return newState;

    case SidenavActionTypes.ToggleLogging:
      newState.loggingEnabled = !state.loggingEnabled;
      return newState;

    default:
      return state;
  }
}

/* selectors */
export const getLoadedProject = (state: SidenavState): Project => state.project;

// TODO temporary
export const getUiState = store.createFeatureSelector<SidenavState>(
  'ui'
);

// TODO temporary
export const getLoadedProjectSelector = store.createSelector<SidenavState, SidenavState, Project>(
  getUiState,
  getLoadedProject
);
