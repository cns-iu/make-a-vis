// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Type } from '@angular/core';

import { GraphicSymbol } from './graphic-symbol';
import { VisualizationComponent } from './visualization-component';


export interface GraphicVariableOption {
  id?: string;
  type: string;
  label: string;
  visualization?: string; // TODO
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
  readonly description?: string;
  readonly component?: Type<VisualizationComponent>;
  readonly graphicSymbolOptions?: GraphicSymbolOption[];

  toJSON(): any;
}
