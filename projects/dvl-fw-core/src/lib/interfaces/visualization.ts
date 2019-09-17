import { GraphicSymbol } from './graphic-symbol';

export interface GraphicVariableOption {
  id?: string;
  type: string;
  label: string;
  scaleType?: string;
  visualization?: string;
  staticVisualization?: string;
  advanced?: boolean;
}

export interface GraphicSymbolOption {
  id: string;
  label: string;
  type: string;

  graphicVariableOptions: GraphicVariableOption[];
}

export interface VisualizationComponent {
  data: Visualization;
}

export interface Visualization {
  id: string;
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };
  readonly description?: string;
  readonly component?: new (...args: any[]) => VisualizationComponent;
  readonly graphicSymbolOptions?: GraphicSymbolOption[];

  toJSON(): any;
}
