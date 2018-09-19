import { SidenavState, INITIAL_SIDENAV_STATE } from '../../toolbar/shared/store/state';
import { VisualizationState, INITIAL_VISUALIZATION_STATE } from '../../visualization-view/shared/store/state';

import { StoreData, InitialStoreData } from './store-data';

export interface ApplicationState {
  ui: SidenavState;
  visualization: VisualizationState;
  // storeData: StoreData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  ui: INITIAL_SIDENAV_STATE,
  visualization: INITIAL_VISUALIZATION_STATE,
  // storeData: InitialStoreData
};
