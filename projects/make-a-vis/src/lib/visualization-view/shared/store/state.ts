import { Visualization } from 'dvl-fw';

export interface VisualizationState {
  activeVisualization: number;
  visualizations: Visualization[];
}


export const INITIAL_VISUALIZATION_STATE: VisualizationState = {
  activeVisualization: -1,
  visualizations: []
};
