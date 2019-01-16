import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { capitalize as loCapitalize, get } from 'lodash';

import { DataVariable, GraphicSymbolOption, GraphicVariable,
  GraphicVariableOption, RecordStream
} from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
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
  @Output() gvSelectionMade = new EventEmitter<boolean>();
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  selectionClass = '';
  availableGraphicVariables: GraphicVariable[];
  selectedDataVariablesMapping: Map<string, Map<string, DataVariable>>;
  qualitativeScaleTypes = ['interval', 'nominal'];
  quantitativeScaleTypes = ['ratio'];
  currentHighlightId: string;
  selectedDataVariableRecordSetId: string;
  gvSelected = false;

  constructor(
    store: Store<SidenavState>,
    private updateService: UpdateVisService,
    private hoverService: DataVariableHoverService
  ) {
    store.pipe(select(getAvailableGraphicVariablesSelector)).subscribe((availableGraphicVariables) => {
      this.availableGraphicVariables = availableGraphicVariables;
    });

    hoverService.hovers.subscribe(event => {
      if (event.length === 0) {
        this.currentHighlightId = undefined;
      } else if (event.length === 3 && event[0] === 'table') {
        this.currentHighlightId = event[1];
        this.selectedDataVariableRecordSetId = event[2];
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes || 'recordStreamMapping' in changes) {
      if (this.activeVis) {
        this.graphicSymbolOptions = this.getGraphicSymbolOptions();
        this.selectedDataVariablesMapping = this.getDataVariableMappings();
        this.updateActionButtonStatus();
      } else {
        this.clear();
      }
    }
  }

  clear() {
    // clear mapping
    if (this.selectedDataVariablesMapping && this.selectedDataVariablesMapping.size) {
      this.selectedDataVariablesMapping.clear();
    }

    // clear graphic-symbol-options
    this.graphicSymbolOptions = [];

    // clear other variables
    this.currentHighlightId = '';
    this.selectedDataVariableRecordSetId = '';
    this.selectionClass = '';
    this.gvSelected = false;
  }

  dataVariableDropped(dataVariable: DataVariable, graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    const mappableGraphicVariables = this.getMappableGraphicVariables(dataVariable, graphicVariableOption, graphicSymbolOption);
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

    this.updateActionButtonStatus();
  }

  getMappableGraphicVariables(
    dataVariable: DataVariable,
    graphicVariableOption: GraphicVariableOption,
    graphicSymbolOption: GraphicSymbolOption
  ): GraphicVariable[] {
    if (this.availableGraphicVariables.length) {
      const filteredGVs: GraphicVariable[] = this.availableGraphicVariables.filter((gv) => {
        return ((gv.type && gv.type === graphicVariableOption.type)
        && (this.recordStreamMapping && this.recordStreamMapping.get(graphicSymbolOption.id))
        && (gv.recordStream.id === this.recordStreamMapping.get(graphicSymbolOption.id).id)
        && (dataVariable.recordSet.id === gv.recordSet.id)
        && (gv.dataVariable.id === dataVariable.id));
      });
      return filteredGVs;
    }
    return [];
  }

  getGraphicSymbolOptions(): GraphicSymbolOption[] {
    const gvOption: GraphicSymbolOption[] = [];
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs) => {
      gvOption.push(this.activeVis.data.graphicSymbolOptions.filter((gso) => gso.id === gs)[0]);
    });
    return gvOption;
  }

  getVariableScaleType(graphicVariableOption: any): string {
    if (graphicVariableOption && graphicVariableOption.scaleType) {
      if (this.quantitativeScaleTypes.indexOf(graphicVariableOption.scaleType) !== -1) {
        return 'Quantitative';
      } else if (this.qualitativeScaleTypes.indexOf(graphicVariableOption.scaleType) !== -1) {
        return 'Qualitative';
      } else {
        return '';
      }
    }
  }

  getGraphicVariableSelected(graphicVariableOption, graphicSymbolOption): string {
    const graphicVariableOptionId = get(graphicVariableOption, 'id');
    const graphicVariableOptionType = get(graphicVariableOption, 'type');
    const graphicSymbolOptionId = get(graphicSymbolOption, 'id');
    const option = graphicVariableOptionId || graphicVariableOptionType;
    if (this.selectedDataVariablesMapping && graphicSymbolOptionId &&
      this.selectedDataVariablesMapping.get(graphicSymbolOptionId).get(option)
    ) {
      return this.selectedDataVariablesMapping.get(graphicSymbolOptionId).get(option).label;
    }
    return '';
  }

  getDataVariableMappings(): Map<string, Map<string, DataVariable>> {
    const dvMap = new Map();
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs: string) => {
      const gvs = Object.keys(this.activeVis.data.graphicSymbols[gs].graphicVariables);
      if (gvs.length) {
       gvs.forEach((gv: string) => {
        const dv = this.activeVis.data.graphicSymbols[gs].graphicVariables[gv].dataVariable;
        const mapEntry = dvMap.get(gs);
        if (mapEntry) {
          mapEntry.set(gv, dv);
        } else {
          dvMap.set(gs, new Map().set(gv, dv));
        }
       });
      }
    });
    return dvMap;
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
      return this.getMappableGraphicVariables(dataVariable, graphicVariableOption, graphicSymbolOption).length > 0;
    };
  }

  unsetGraphicVariable(graphicSymbolOptionId: string, graphicVariableOptionIdOrType: string) {
    this.updateService.unsetGraphicVariable(this.activeVis.data, graphicSymbolOptionId, graphicVariableOptionIdOrType);
    this.selectedDataVariablesMapping.get(graphicSymbolOptionId).delete(graphicVariableOptionIdOrType);
    if (!this.selectedDataVariablesMapping.get(graphicSymbolOptionId).size) {
      this.selectedDataVariablesMapping.delete(graphicSymbolOptionId);
    }
    this.updateActionButtonStatus();
  }

  updateActionButtonStatus() {
    if (this.selectedDataVariablesMapping && this.selectedDataVariablesMapping.size) {
      this.gvSelected = true;
    } else {
      this.gvSelected = false;
    }

    this.gvSelectionMade.emit(this.gvSelected);
  }

  shouldHighlight(graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption): boolean {
    return this.getMappableGraphicVariables(
      { id: this.currentHighlightId, recordSet: { id: this.selectedDataVariableRecordSetId } } as any,
      graphicVariableOption, graphicSymbolOption
    ).length !== 0;
  }

  startHover(
    graphicVariableOption: GraphicVariableOption,
    graphicSymbolOption: GraphicSymbolOption
    ): void {
    const filteredGraphicVariables = this.availableGraphicVariables.filter((gv) => {
      return ((gv.type && gv.type === graphicVariableOption.type)
      && (this.recordStreamMapping && this.recordStreamMapping.get(graphicSymbolOption.id))
      && (gv.recordStream.id === this.recordStreamMapping.get(graphicSymbolOption.id).id));
    });

    if (filteredGraphicVariables.length) {
      const ids = filteredGraphicVariables.map(gv => gv.dataVariable.id);

      this.hoverService.startHover([
        'selector',
        filteredGraphicVariables[0].dataVariable.recordSet.id
      ].concat(ids));
    }
  }

  endHover(): void {
    this.hoverService.endHover();
  }

  capitalize(text: string): string {
    return loCapitalize(text);
  }
}
