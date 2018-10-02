import { clone, mapValues } from 'lodash';
import { GraphicSymbol } from '../shared/graphic-symbol';
import { Visualization } from '../shared/visualization';

export class ClonedGraphicSymbol implements GraphicSymbol {
  id = this.original.id;
  type = this.original.type;
  recordStream = this.original.recordStream;
  graphicVariables = clone(this.original.graphicVariables);

  constructor(private readonly original: GraphicSymbol) { }

  toJSON(): any { return this.original.toJSON(); }
}

export class ClonedVisualization implements Visualization {
  id = this.original.id;
  template = this.original.template;
  properties = clone(this.original.properties);
  graphicSymbols = mapValues(this.original.graphicSymbols, sym => new ClonedGraphicSymbol(sym));
  get component() { return this.original.component; }
  get graphicSymbolOptions() { return this.original.graphicSymbolOptions; }

  constructor(private readonly original: Visualization) { }

  toJSON(): any { return this.original.toJSON(); }
}
