import { SidenavState, INITIAL_SIDENAV_STATE } from '../../toolbar/shared/store/state';
import { VisualizationState, INITIAL_VISUALIZATION_STATE } from '../../visualization-view/shared/store/state';

export interface ApplicationState {
  ui: SidenavState;
  visualization: VisualizationState;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  ui: INITIAL_SIDENAV_STATE,
  visualization: INITIAL_VISUALIZATION_STATE
};
