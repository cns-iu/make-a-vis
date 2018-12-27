import { Visualization } from '@dvl-fw/core';

export type ModeType = 'add'| 'edit';

export interface Vis {
  label: string;
  data: Visualization;
}

export interface VisType {
  template: string;
  label: string;
  icon: string;
}

export interface ToggleSelectionPanelType {
  state: boolean;
  mode: ModeType;
  activeVis: Vis;
}
