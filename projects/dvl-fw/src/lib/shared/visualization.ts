import { GraphicSymbol } from './graphic-symbol';
import { VisualizationComponent } from './visualization-component';
import { Type } from '@angular/core';


export interface Visualization {
  id: string;
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };
  component?: Type<VisualizationComponent>;

  toJSON(): any;
}
