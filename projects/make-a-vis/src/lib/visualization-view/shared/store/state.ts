import { DataVariable, Project, Visualization } from 'dvl-fw';

export interface VisualizationState {
  activeVisualization: Visualization;
  activeDataVariable: DataVariable;
}


export const INITIAL_VISUALIZATION_STATE: VisualizationState = {
  activeVisualization: null,
  activeDataVariable: null,
};
