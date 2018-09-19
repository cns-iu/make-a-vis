import { SidenavState, INITIAL_SIDENAV_STATE } from './state';
import { SidenavActionTypes } from './actions';

export function sidenavStateReducer (
  state: SidenavState = INITIAL_SIDENAV_STATE,
  action: any
) {

  let newState: SidenavState = null;

  switch (action.type)  {
    case SidenavActionTypes.SaveProject :
      newState = Object.assign({filename: 'name1.bkp'}, state);
      newState.projectSaved = !state.projectSaved;
      return newState;

    case SidenavActionTypes.LoadProject :
      newState = Object.assign({}, state);
      return newState;

    case SidenavActionTypes.NewProject :
      newState = Object.assign({}, state);
      return newState;

    case SidenavActionTypes.ExportProject :
      newState = Object.assign({}, state);
      return newState;

    case SidenavActionTypes.ShareProject :
      newState = Object.assign({}, state);
      return newState;

    case SidenavActionTypes.ToggleLogging :
      newState = Object.assign({}, state);
      return newState;

    default :
      return state;
  }
}

export const getSaveProjectState = (state: SidenavState) => state.projectSaved;
export const getLoadProjectState = (state: SidenavState) => state.projectLoaded;
export const getNewProjectState = (state: SidenavState) => [state.newProjectName, state.newProjectFileType];
export const getExportProjectState = (state: SidenavState) => state.exportProjectFileType;
export const getSharedProjectState = (state: SidenavState) => state.shareUrl;
export const getLoggingState = (state: SidenavState) => state.isLoggingEnabled;
