import { GraphicSymbol } from './graphic-symbol';


export class Visualization {
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };
}
