import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { DataVariable, GraphicSymbol, GraphicSymbolOption, GraphicVariable, RecordStream, GraphicVariableOption } from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { Vis } from '../../shared/types';
import { getAvailableGraphicVariablesSelector, SidenavState } from '../../toolbar/shared/store';

@Component({
  selector: 'mav-selection-graphic-variable-type',
  templateUrl: './graphic-variable-type.component.html',
  styleUrls: ['./graphic-variable-type.component.sass']
})
export class GraphicVariableTypeComponent implements OnInit, OnChanges {
  @Input() activeVis: Vis;
  @Input() recordStream: RecordStream;
  graphicSymbolTypes: GraphicSymbolOption[] = [];
  selectionClass = '';
  availableGraphicVariables: GraphicVariable[];

  constructor(private store: Store<SidenavState>, private updateService: UpdateVisService) {
    this.store.pipe(select(getAvailableGraphicVariablesSelector)).subscribe((availableGraphicVariables) => {
      this.availableGraphicVariables = availableGraphicVariables;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes) {
      if (this.activeVis && Object.keys(this.activeVis.data.graphicSymbols).length) {
        this.getGraphicVariableOptions();
      }
    }
  }

  dataVariableDropped(dataVariable: DataVariable, graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    const mappableGraphicVariables = this.getGraphicVariable(dataVariable, graphicVariableOption);
    if (mappableGraphicVariables.length) {
      this.updateService.updateGraphicVariable(this.activeVis.data, graphicSymbolOption.id,
        mappableGraphicVariables[0].id || mappableGraphicVariables[0].type, mappableGraphicVariables[0]);
    }
  }

  getGraphicVariable(dataVariable: DataVariable, graphicVariableOption: GraphicVariableOption): GraphicVariable[] {
    if (this.availableGraphicVariables.length) {
      const filteredGVs: GraphicVariable[] = this.availableGraphicVariables.filter((gv) => {
        return ((gv.type && gv.type === graphicVariableOption.type)
        && (gv.recordStream.id === this.recordStream.id)
        && (gv.dataVariable.id === dataVariable.id));
      });
      return filteredGVs;
    }
  }

  getGraphicVariableOptions() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs) => {
      this.graphicSymbolTypes.push(this.activeVis.data.graphicSymbolOptions.filter((gso) => gso.id === gs)[0]);
    });
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  acceptsDrop(graphicVariableOption: GraphicVariableOption) {
    return (dataVariable: DataVariable) => {
      return this.getGraphicVariable(dataVariable, graphicVariableOption).length > 0;
    };
  }
}
