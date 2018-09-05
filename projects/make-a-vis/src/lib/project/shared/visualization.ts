import { GraphicSymbol } from './graphic-symbol';


export class Visualization {
  id: string;
  template: string;
  properties: { [key: string]: any };
  graphicSymbols: { [slot: string]: GraphicSymbol };
}
