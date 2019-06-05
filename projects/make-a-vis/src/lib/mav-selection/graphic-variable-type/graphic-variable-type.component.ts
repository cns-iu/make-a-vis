import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { DataVariable, GraphicSymbolOption, GraphicVariable, GraphicVariableOption, RecordStream } from '@dvl-fw/core';
import { select, Store } from '@ngrx/store';
import { capitalize as loCapitalize, cloneDeep, get } from 'lodash';
import { Subscription } from 'rxjs';

import { DragDropEvent } from '../../drag-drop';
import { AdvancedService, MAV_ADVANCED_KEY } from '../../shared/services/advance/advanced.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { Vis } from '../../shared/types';
import { getAvailableGraphicVariablesSelector } from '../../toolbar/shared/store';
import { getAdvancedEnabledSelector, GVGroupPanelClosed, GVGroupPanelOpened, MavSelectionState } from '../shared/store';

/**
 * Mav Selection graphic-variable-type component declaration, responsible for showing graphic-variable-type options in mav-selection
 */
@Component({
  selector: 'mav-selection-graphic-variable-type',
  templateUrl: './graphic-variable-type.component.html',
  styleUrls: ['./graphic-variable-type.component.scss']
})
export class GraphicVariableTypeComponent implements OnChanges, OnDestroy {
  /**
   * Input for the visualization currently active, or being viewed by the user
   */
  @Input() activeVis: Vis;
  /**
   * Input for the mappings from graphic-symbol-option-id to recordStream i.e. Map<gsoId, RecordStream>
   */
  @Input() recordStreamMapping: Map<string, RecordStream>;
  /**
   * Output event-emitter with boolean value indicating if a graphic-variable selection has been made
   */
  @Output() gvSelectionMade = new EventEmitter<boolean>();
  /**
   * Available graphic symbol options
   */
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  /**
   * Selection class of graphic variable type component
   */
  selectionClass = '';
  /**
   * Available graphic variables
   */
  availableGraphicVariables: GraphicVariable[];
  /**
   * Selected data variables mapping i.e. Map<graphic-symbol-option-id, Map<graphic-variable-id, data-variable>
   */
  selectedDataVariablesMapping: Map<string, Map<string, DataVariable>>;
  /**
   * Required graphic variables mapping i.e. Map<graphic-symbol-option-id, array of required graphic-variable Ids>
   */
  requiredGraphicVariablesMapping: Map<string, string[]>;
  /**
   * Allowed qualitative scale types
   */
  qualitativeScaleTypes = ['interval', 'nominal'];
  /**
   * Allowed quantitative scale types
   */
  quantitativeScaleTypes = ['ratio'];
  /**
   * Graphic variable id of the currently highlighted graphic variable
   */
  currentHighlightId: string;
  /**
   * Record set id of the selected data-variable
   */
  selectedDataVariableRecordSetId: string;
  /**
   * Hover service subscription
   */
  hoverServiceSubscription: Subscription;
  /**
   * Advanced service subscription
   */
  advancedServiceSubscription: Subscription;

  /**
   * Graphic variable subscription
   */
  graphicVariableSubscription: Subscription;

  /**
   * Creates an instance of graphic variable type component.
   * @param store
   * @param updateService instance of UpdateVisService, responsible for dispatching store actions for updating visualizations
   * @param hoverService instance of DataVariableHoverService, responsible for hover actions on data-variables
   */
  constructor(
    private store: Store<any>,
    private updateService: UpdateVisService,
    private hoverService: DataVariableHoverService,
    private advancedService: AdvancedService,
    private mavSelectionStore: Store<MavSelectionState>
  ) {
    this.advancedService.addAdvancedCheat();
    this.graphicVariableSubscription = store.pipe(select(getAvailableGraphicVariablesSelector)).subscribe((availableGraphicVariables) => {
      this.availableGraphicVariables = availableGraphicVariables;
    });
    this.advancedServiceSubscription = mavSelectionStore.pipe(select(getAdvancedEnabledSelector)).subscribe(() => {
      this.updateVisualization();
    });

    this.hoverServiceSubscription = hoverService.hovers.subscribe(event => {
      if (event.length === 0) {
        this.currentHighlightId = undefined;
      } else if (event.length === 3 && event[0] === 'table') {
        this.currentHighlightId = event[1];
        this.selectedDataVariableRecordSetId = event[2];
      }
    });
  }


  /**
   * Update the visualization with latest graphic variable.
   */
  updateVisualization(): void {
    this.graphicSymbolOptions = this.getGraphicSymbolOptions();
    this.requiredGraphicVariablesMapping = this.getReqGVMappings();
    this.selectedDataVariablesMapping = this.getDataVariableMappings();
    this.updateActionButtonStatus();
  }

  /**
   * Angular life cycle hook, clear subscriptions here.
   */
  ngOnDestroy(): void {
    this.hoverServiceSubscription.unsubscribe();
    this.advancedServiceSubscription.unsubscribe();
    this.graphicVariableSubscription.unsubscribe();
  }

  /**
   * on changes
   * @param changes The changed properties object
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes || 'recordStreamMapping' in changes) {
      if (this.activeVis) {
        this.updateVisualization();
      } else {
        this.clear();
      }
    }
  }

  /**
   * Clears global variables and mappings
   */
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

  /**
   * Updates mapping and done button status
   * @param dataVariable The dropped data-variable
   * @param graphicVariableOption the graphic-variable-option on which the data-variable was dropped
   * @param graphicSymbolOption the graphic-symbol-option to which the graphic-variable-option belongs
   */
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

  /**
   * Gets graphic variables that can be mapped to the provided data-variable
   * @param dataVariable the provided data-variable
   * @param graphicVariableOption the graphic-variable-option used to create the mapping
   * @param graphicSymbolOption the graphic-symbol-option-id to which the graphic-variabl-option belongs
   * @returns mappable graphic variables
   */
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

  /**
   * Gets graphic symbol options for the active visualization.
   * Also filtering the graphic variables if advanced is enabled or disabled.
   * @returns graphic symbol options
   */
  getGraphicSymbolOptions(): GraphicSymbolOption[] {
    const gvOption: GraphicSymbolOption[] = [];
    if (this.activeVis) {
      const gvOptions = cloneDeep(this.activeVis.data.graphicSymbolOptions);
      Object.keys(this.activeVis.data.graphicSymbols).forEach((gs) => {
        gvOption.push(gvOptions.filter((gso) => gso.id === gs)[0]);
      });
      if (localStorage.getItem(MAV_ADVANCED_KEY) === null) {
        gvOption[0].graphicVariableOptions = gvOption[0].graphicVariableOptions.filter((gv) => !gv.advanced);
      }
      return gvOption;
    }
  }

  /**
   * Gets graphic variable scale type
   * @param graphicVariableOption the provided graphic-variable-option
   * @returns graphic variable's scale type for the provided graphic-variable-option
   */
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

  /**
   * Gets the name of the data-variable that is mapped to the graphic-variable-option
   * @param graphicVariableOption the provided graphic-variable-option
   * @param graphicSymbolOption the provided graphic-symbol-option to which the graphic-variable-option belongs
   * @returns name of the data-variable mapped to the graphic-variable-option
   */
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

  /**
   * Gets data variable mappings i.e. Map<graphic-symbol-option-id, Map<graphic-variable-id, data-variable>
   * @returns data variable mappings
   */
  getDataVariableMappings(): Map<string, Map<string, DataVariable>> {
    const dvMap = new Map();
    if (this.activeVis) {
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
  }

  /**
   * Gets req graphic-variablemappings i.e. Map<graphic-symbol-option-id, array of required graphic-variable Ids>
   * @returns req graphic-variable mappings
   */
  getReqGVMappings(): Map<string, string[]> {
    const reqGVMap = new Map();
    if (this.graphicSymbolOptions && this.graphicSymbolOptions.length) {
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

  /**
   * Callback handler for drag-drop event that happens when a data-variable is dropped on the graphic-variable
   * @param event instance of DragDropEvent object
   */
  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  /**
   * Tells if the data-variable will be accepted by a graphic-variable dropzone
   * @param graphicVariableOption the graphic-variable-option on which the data-variable is being dropped
   * @param graphicSymbolOption the graphic-symbol-option to which the graphic-variable-option belongs
   * @returns a function which given a data-variable returns a boolean telling if the data-variable can be mapped to a graphic-variable
   */
  acceptsDrop(graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    return (dataVariable: DataVariable) => {
      return this.getMappableGraphicVariables(dataVariable, graphicVariableOption, graphicSymbolOption).length > 0;
    };
  }

  /**
   * Unsets graphic variable selection
   * @param graphicSymbolOptionId id of graphic-symbol-option to which the graphic-variable-option belongs
   * @param graphicVariableOptionIdOrType id or type of graphic-variable-option
   */
  unsetGraphicVariable(graphicSymbolOptionId: string, graphicVariableOptionIdOrType: string) {
    this.updateService.unsetGraphicVariable(this.activeVis.data, graphicSymbolOptionId, graphicVariableOptionIdOrType);
    this.selectedDataVariablesMapping.get(graphicSymbolOptionId).delete(graphicVariableOptionIdOrType);
    if (!this.selectedDataVariablesMapping.get(graphicSymbolOptionId).size) {
      this.selectedDataVariablesMapping.delete(graphicSymbolOptionId);
    }
    this.updateActionButtonStatus();
  }

  /**
   * Updates done button status
   */
  updateActionButtonStatus() {
    let result = true;
    this.requiredGraphicVariablesMapping.forEach((reqGVIds, gsoId) => {
      result = result && reqGVIds.every((gvId) => {
        if (this.selectedDataVariablesMapping.get(gsoId)) {
          return Boolean(this.selectedDataVariablesMapping.get(gsoId).get(gvId));
        } else {
          return false;
        }
      });
    });

    this.gvSelectionMade.emit(result);
  }

  /**
   * Highlights the graphic-variable-option which can be mapped for the dragged/hovered data-variable
   * @param graphicVariableOption provided graphic-variable-option
   * @param graphicSymbolOption graphic-symbol-option to which graphic-variable-option belongs
   * @returns boolean if it can be highlighted
   */
  shouldHighlight(graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption): boolean {
    return this.getMappableGraphicVariables(
      { id: this.currentHighlightId, recordSet: { id: this.selectedDataVariableRecordSetId } } as any,
      graphicVariableOption, graphicSymbolOption
    ).length !== 0;
  }

  /**
   * Callback handler for when hovering starts on the data-variable
   * @param graphicVariableOption provided graphic-variable-option
   * @param graphicSymbolOption graphic-symbol-option to which graphic-variable-option belongs
   */
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

  /**
   * wrapper for end-hover function of hover-service
   */
  endHover(): void {
    this.hoverService.endHover();
  }

  /**
   * Capitalizes the text in sentence case
   * @param text provided string
   * @returns capitalized string
   */
  capitalize(text: string): string {
    return loCapitalize(text);
  }

  /**
   * Callback handler for when the graphic-variable-selection panel is opened
   * @param gsOption the graphic-symbol-option whose panel is opened
   */
  panelOpened(gsOption: GraphicSymbolOption): void {
    const gsId = gsOption.id;
    const mapping = this.recordStreamMapping;
    const stream = mapping && mapping.get(gsId);
    const streamId = stream && stream.id;
    this.store.dispatch(new GVGroupPanelOpened({ gsId, streamId }));
  }

  /**
   * Callback handler for when the graphic-variable-selection panel is closed
   * @param gsOption the graphic-symbol-option whose panel is closed
   */
  panelClosed(gsOption: GraphicSymbolOption): void {
    const gsId = gsOption.id;
    const mapping = this.recordStreamMapping;
    const stream = mapping && mapping.get(gsId);
    const streamId = stream && stream.id;
    this.store.dispatch(new GVGroupPanelClosed({ gsId, streamId }));
  }
}
