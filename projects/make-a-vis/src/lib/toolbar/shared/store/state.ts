export interface SidenavState {
  projectSaved: boolean;
  projectLoaded: boolean;

  newProjectName: string;
  newProjectFileType: string;

  exportProjectFileType: string;

  shareUrl: string;

  isLoggingEnabled: boolean;
}


export const INITIAL_SIDENAV_STATE: SidenavState = {
  projectSaved: false,
  projectLoaded: false,

  newProjectName: 'new-project',
  newProjectFileType: '',

  exportProjectFileType: '',

  shareUrl: '',

  isLoggingEnabled: false
};
