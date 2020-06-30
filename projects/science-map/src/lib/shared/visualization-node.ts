export interface VisualizationNode {
  identifier: any;
  latitude?: number;
  longitude?: number;
  x?: any;
  y?: any;
  position?: [number, number];

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
