import { GraphicSymbol } from './graphic-symbol';
import { VisualizationComponent } from './visualization-component';
import { Type } from '@angular/core';

export interface GraphicVariableOption {
  type: string;
  label: string;
}

export interface GraphicSymbolOption {
  id: string;
  label: string;
  type: string;

  graphicVariableOptions: GraphicVariableOption[];
}

export interface Visualization {
  id: string;
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };
  readonly component?: Type<VisualizationComponent>;
  readonly graphicSymbolOptions?: GraphicSymbolOption[];

  toJSON(): any;
}
