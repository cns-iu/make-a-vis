import { MavSelectionState, initialMavSelectionState } from '../../mav-selection/shared/store/state';
import { SidenavState, INITIAL_SIDENAV_STATE } from '../../toolbar/shared/store/state';

export interface ApplicationState {
  ui: SidenavState;
  mavSelection: MavSelectionState;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  ui: INITIAL_SIDENAV_STATE,
  mavSelection: initialMavSelectionState
};
