import { Type } from '@angular/core';
import {
  GraphicSymbol, GraphicSymbolOption, GraphicVariable, RecordStream, Visualization, VisualizationComponent,
} from '@dvl-fw/core';
import { clone, mapValues } from 'lodash';

export class ClonedGraphicSymbol implements GraphicSymbol {
  id: string = this.original.id;
  type: string = this.original.type;
  recordStream: RecordStream = this.original.recordStream;
  graphicVariables: { [id: string]: GraphicVariable } = clone(this.original.graphicVariables);

  constructor(private readonly original: GraphicSymbol) { }

  toJSON(): any { return this.original.toJSON(); }
}

export class ClonedVisualization implements Visualization {
  id: string = this.original.id;
  template: string = this.original.template;
  properties: { [prop: string]: any } = clone(this.original.properties) || {};
  graphicSymbols: { [slot: string]: ClonedGraphicSymbol } = mapValues(
    this.original.graphicSymbols, sym => new ClonedGraphicSymbol(sym)
  ) || {};
  component: Type<VisualizationComponent> = this.original.component;
  graphicSymbolOptions: GraphicSymbolOption[] = this.original.graphicSymbolOptions;

  constructor(private readonly original: Visualization) { }

  normalize(): void {
    // TODO: Remove graphic symbols not satisfying options
  }

  toJSON(): any { return this.original.toJSON(); }
}
