import { SidenavState, INITIAL_SIDENAV_STATE } from '../../toolbar/shared/store/state';

export interface ApplicationState {
  ui: SidenavState;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  ui: INITIAL_SIDENAV_STATE
};
