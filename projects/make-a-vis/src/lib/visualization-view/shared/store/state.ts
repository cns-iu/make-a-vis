import { DataVariable, Project, Visualization } from 'dvl-fw';

export interface VisualizationState {
  activeVisualization: number;
  visualizations: Visualization[];
}


export const INITIAL_VISUALIZATION_STATE: VisualizationState = {
  activeVisualization: 0,
  visualizations: []
};
