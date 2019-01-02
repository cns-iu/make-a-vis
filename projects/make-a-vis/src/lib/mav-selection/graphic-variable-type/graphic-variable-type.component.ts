import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { DataVariable, GraphicSymbolOption, GraphicVariable,
  GraphicVariableOption, RecordStream, Visualization, ProjectSerializerService } from '@dvl-fw/core';
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
  @Input() recordStreamMapping: Map<string, RecordStream>;
  graphicSymbolTypes: GraphicSymbolOption[] = [];
  selectionClass = '';
  availableGraphicVariables: GraphicVariable[];
  selectedDataVariablesMapping: Map<string, Map<string, DataVariable>>;

  constructor(private store: Store<SidenavState>, private updateService: UpdateVisService, private serializer: ProjectSerializerService) {
    this.store.pipe(select(getAvailableGraphicVariablesSelector)).subscribe((availableGraphicVariables) => {
      this.availableGraphicVariables = availableGraphicVariables;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes || 'recordStreamMapping' in changes) {
      if (this.activeVis) {
        this.graphicSymbolTypes = [];
        this.selectedDataVariablesMapping = new Map();
        this.getGraphicVariableOptions();
        this.getDataVariables();
      }
    }
  }

  dataVariableDropped(dataVariable: DataVariable, graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    const mappableGraphicVariables = this.getGraphicVariable(dataVariable, graphicVariableOption, graphicSymbolOption);
    if (mappableGraphicVariables.length) {
      this.updateService.updateGraphicVariable(this.activeVis.data, graphicSymbolOption.id,
        graphicVariableOption.id || graphicVariableOption.type, mappableGraphicVariables[0]);

      if (this.selectedDataVariablesMapping.get(graphicSymbolOption.id)) {
        this.selectedDataVariablesMapping.get(graphicSymbolOption.id)
          .set(graphicVariableOption.id || graphicVariableOption.type, dataVariable);
      } else {
        this.selectedDataVariablesMapping.set(
          graphicSymbolOption.id,
          new Map().set(graphicVariableOption.id || graphicVariableOption.type, dataVariable)
        );
      }
    }
  }

  getGraphicVariable(
    dataVariable: DataVariable,
    graphicVariableOption: GraphicVariableOption,
    graphicSymbolOption: GraphicSymbolOption
  ): GraphicVariable[] {
    if (this.availableGraphicVariables.length) {
      const filteredGVs: GraphicVariable[] = this.availableGraphicVariables.filter((gv) => {
        return ((gv.type && gv.type === graphicVariableOption.type)
        && (gv.recordStream.id === this.recordStreamMapping.get(graphicSymbolOption.id).id)
        && (gv.dataVariable.id === dataVariable.id));
      });
      return filteredGVs;
    }
  }

  getGraphicVariableOptions() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs) => {
      this.graphicSymbolTypes.push(this.activeVis.data.graphicSymbolOptions.filter((gso) => gso.id === gs)[0]);
    });
    console.log('graphic symbol');
    console.log(this.graphicSymbolTypes);
  }

  getDataVariables() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs: string) => {
      const gvs = Object.keys(this.activeVis.data.graphicSymbols[gs].graphicVariables);
      if (gvs.length) {
       gvs.forEach((gv: string) => {
        const dv = this.activeVis.data.graphicSymbols[gs].graphicVariables[gv].dataVariable;
        const mapEntry = this.selectedDataVariablesMapping.get(gs);
        if (mapEntry) {
          mapEntry.set(gv, dv);
        } else {
          this.selectedDataVariablesMapping.set(gs, new Map().set(gv, dv));
        }
       });
      }
    });
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  acceptsDrop(graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    return (dataVariable: DataVariable) => {
      return this.getGraphicVariable(dataVariable, graphicVariableOption, graphicSymbolOption).length > 0;
    };
  }

  unsetGraphicVariable(graphicSymbolOptionId: string, graphicVariableOptionIdOrType: string) {
    this.updateService.unsetGraphicVariable(this.activeVis.data, graphicSymbolOptionId, graphicVariableOptionIdOrType);
    this.selectedDataVariablesMapping.get(graphicSymbolOptionId).delete(graphicVariableOptionIdOrType);
  }
}
