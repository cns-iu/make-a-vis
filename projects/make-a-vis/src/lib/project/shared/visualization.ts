import { GraphicSymbol } from './graphic-symbol';

export class Visualization {
  template: string;
  properties: Map<string, any>;
  graphicSymbols: Map<string, GraphicSymbol[]>;
}
