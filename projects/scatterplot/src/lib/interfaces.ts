export interface VisualizationNode {
  identifier: any;
  x: any;
  y: any;

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

  gridlines: boolean;
  gridlinesColor: string;
  gridlinesOpacity: number;
  tickLabelColor: string;
  showTicks: boolean;
  showAxisLabels: boolean;
}
