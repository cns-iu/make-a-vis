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
  latitude1: number;
  longitude1: number;
  latitude2: number;
  longitude2: number;

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
