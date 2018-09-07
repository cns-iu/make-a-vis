import { GraphicSymbol } from './graphic-symbol';


export interface Visualization {
  id: string;
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };

  toJSON(): any;
}
