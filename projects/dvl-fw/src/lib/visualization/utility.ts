import { Type } from '@angular/core';
import { clone, mapValues } from 'lodash';
import { GraphicSymbol } from '../shared/graphic-symbol';
import { GraphicVariable } from '../shared/graphic-variable';
import { RecordStream } from '../shared/record-stream';
import { Visualization, GraphicSymbolOption } from '../shared/visualization';
import { VisualizationComponent } from '../shared/visualization-component';

export class ClonedGraphicSymbol implements GraphicSymbol {
  id: string = this.original.id;
  type: string = this.original.type;
  recordStream: RecordStream = this.original.recordStream;
  graphicVariables: { [id: string]: GraphicVariable} = clone(this.original.graphicVariables);

  constructor(private readonly original: GraphicSymbol) { }

  toJSON(): any { return this.original.toJSON(); }
}

export class ClonedVisualization implements Visualization {
  id: string = this.original.id;
  template: string = this.original.template;
  properties: { [prop: string]: any } = clone(this.original.properties);
  graphicSymbols: { [slot: string]: GraphicSymbol } = mapValues(this.original.graphicSymbols, sym => new ClonedGraphicSymbol(sym));
  get component(): Type<VisualizationComponent> { return this.original.component; }
  get graphicSymbolOptions(): GraphicSymbolOption[] { return this.original.graphicSymbolOptions; }

  constructor(private readonly original: Visualization) { }

  toJSON(): any { return this.original.toJSON(); }
}
