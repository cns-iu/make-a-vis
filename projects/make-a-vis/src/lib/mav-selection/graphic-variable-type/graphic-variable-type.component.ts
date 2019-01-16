import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { capitalize as loCapitalize, get } from 'lodash';

import { DataVariable, GraphicSymbolOption, GraphicVariable,
  GraphicVariableOption, RecordStream
} from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { Vis } from '../../shared/types';
import { getAvailableGraphicVariablesSelector } from '../../toolbar/shared/store';
import { GVGroupPanelOpened, GVGroupPanelClosed } from '../shared/store';

@Component({
  selector: 'mav-selection-graphic-variable-type',
  templateUrl: './graphic-variable-type.component.html',
  styleUrls: ['./graphic-variable-type.component.sass']
})
export class GraphicVariableTypeComponent implements OnChanges {
  @Input() activeVis: Vis;
  @Input() recordStreamMapping: Map<string, RecordStream>; // i.e. Map<gsoId, RecordStream>
  @Output() gvSelectionMade = new EventEmitter<boolean>();
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  selectionClass = '';
  availableGraphicVariables: GraphicVariable[];
  selectedDataVariablesMapping: Map<string, Map<string, DataVariable>>; // i.e. Map<gsoId, Map<gvId, DataVariable>
  requiredGraphicVariablesMapping: Map<string, string[]>; // i.e. Map<gsoId, array of required gvIds>
  qualitativeScaleTypes = ['interval', 'nominal'];
  quantitativeScaleTypes = ['ratio'];
  currentHighlightId: string;
  selectedDataVariableRecordSetId: string;

  constructor(
    private store: Store<any>,
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

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes || 'recordStreamMapping' in changes) {
      if (this.activeVis) {
        this.graphicSymbolOptions = this.getGraphicSymbolOptions();
        this.requiredGraphicVariablesMapping = this.getReqGVMappings();
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
      this.selectedDataVariablesMapping.get(graphicSymbolOptionId) &&
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

  getReqGVMappings (): Map<string, string[]> {
    const reqGVMap = new Map();
    if (this.graphicSymbolOptions.length) {
      this.graphicSymbolOptions.forEach((gso) => {
        gso.graphicVariableOptions.forEach((gvo: any) => {
          if (gvo && gvo.required) {
            if (reqGVMap.get(gso.id)) {
              reqGVMap.get(gso.id).push(gvo.id ? gvo.id : gvo.type);
            } else {
              reqGVMap.set(gso.id, Array.of(gvo.id ? gvo.id : gvo.type));
            }
          }
        });
      });
    }

    return reqGVMap;
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
    let result = true;
    this.requiredGraphicVariablesMapping.forEach((reqGVIds, gsoId) => {
      result = result && reqGVIds.every((gvId) => {
        if (this.selectedDataVariablesMapping.get(gsoId)) {
          return this.selectedDataVariablesMapping.get(gsoId).get(gvId) ? true : false;
        } else {
          return false;
        }
      });
    });

    this.gvSelectionMade.emit(result);
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

  panelOpened(gsOption: GraphicSymbolOption): void {
    const gsId = gsOption.id;
    const mapping = this.recordStreamMapping;
    const stream = mapping && mapping.get(gsId);
    const streamId = stream && stream.id;
    this.store.dispatch(new GVGroupPanelOpened({ gsId, streamId }));
  }

  panelClosed(gsOption: GraphicSymbolOption): void {
    const gsId = gsOption.id;
    const mapping = this.recordStreamMapping;
    const stream = mapping && mapping.get(gsId);
    const streamId = stream && stream.id;
    this.store.dispatch(new GVGroupPanelClosed({ gsId, streamId }));
  }
}
