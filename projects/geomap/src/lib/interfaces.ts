export interface VisualizationNode {
  identifier: any;
  latitude: number;
  longitude: number;

  color: string;
  strokeColor: string;
  strokeWidth: number;
  areaSize: number;
  transparency: number;
  strokeTransparency: number;
  label: string;
  tooltip: string;
  labelPosition: string;
  shape: string;
  pulse: boolean;
}

export interface VisualizationEdge {
  identifier: any;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;

  color: string;
  strokeColor: string;
  strokeWidth: number;
  areaSize: number;
  transparency: number;
  strokeTransparency: number;
  label: string;
  tooltip: string;
  labelPosition: string;
  shape: string;
  pulse: boolean;
}
