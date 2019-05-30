import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProjectSerializerService, RecordStream, Visualization } from '@dvl-fw/core';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';
import { of } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';

import { ModeType, ToggleSelectionPanelType, Vis, VisType } from '../../shared/types';
import { getLoadedProjectSelector } from '../../toolbar/shared/store';
import { GVPanelClosed, GVPanelOpened } from '../shared/store';
import { VisualizationTypeComponent } from '../visualization-type/visualization-type.component';

/**
 * Mav Selection main component declaration, responsible for displaying the vis-type, graphic-symbol and graphic-variable selection panels
 */
@Component({
  selector: 'mav-selection',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  /**
   * Output event-emitter of new visualization added by the selection
   */
  @Output() newVis = new EventEmitter();
  /**
   * Output event-emitter of the state of the selection panel
   */
  @Output() selectionPanelClosed = new EventEmitter();
  /**
   * View child of this component which refers to VisualizationTypeComponent
   */
  @ViewChild('visType') visType: VisualizationTypeComponent;
  /**
   * Mapping from graphic-symbol-option-id to RecordStream
   */
  recordStreamMapping: Map<string, RecordStream>;
  /**
   * Mode in which the selection panel is opened - add/edit
   */
  mode: ModeType;
  /**
   * The active visualization in make-a-vis - currently selected tab
   */
  activeVis: Vis;
  /**
   * State of the selection panel, if its open or closed
   */
  panelState = false;
  /**
   * Step number in the selection panel - vis-type selection is step 0,
   * graphic-symbol selection is step 1,
   * and graphic-variable selection is step 2
   */
  step = 0;
  /**
   * The state of the done button in the vis-type selection stage
   */
  visSelectionButtonState = false;
   /**
   * The state of the done button in the graphic-variable selection stage
   */
  gvSelectionButtonState = false;

  /**
   * Creates an instance of mav-selection main component.
   * @param store reference to Store
   * @param serializer reference to the Project Serializer Service
   */
  constructor(private store: Store<any>, private serializer: ProjectSerializerService) { }

  /**
   * Toggles selection panel
   * @param eventArgs provide selection panel state, the mode in which the panel was opened and the active visualization
   */
  toggleSelectionPanel(eventArgs: ToggleSelectionPanelType) {
    this.panelState = eventArgs.state;
    this.mode = eventArgs.mode;
    this.activeVis = eventArgs.activeVis;

    if (this.mode === 'add') {
      this.step = 0;
    }

    if (this.activeVis && this.mode === 'edit') {
      this.step = 1;
    }

    if (!this.panelState && this.step === 2) {
      this.gvPanelClosed();
    }

    this.setVisSelectionButtonState(false);
  }

  /**
   * Sets the button state of the done button vis-type selection stage
   * @param visSelected the vis-type that was selected
   */
  setVisSelectionButtonState(visSelected: boolean) {
    if (this.mode === 'add') {
      this.visSelectionButtonState = visSelected;
    }

    if (this.mode === 'edit') {
      this.visSelectionButtonState = false;
    }
  }

  /**
   * Adds the selected vis-type visualization
   * @param type vis-type selected
   */
  addVisualization(type: VisType) {
    if (this.mode === 'add') {
      const preData: Partial<Visualization> = {
        id: `visualization-${uniqueId()}`,
        template: type.template,
        properties: {},
        graphicSymbols: {}
      };

      this.store.pipe(
        select(getLoadedProjectSelector),
        take(1),
        concatMap(project => this.serializer.createVisualization(type.template, preData, project)),
        catchError(() => of(preData as Visualization))
      ).subscribe((data: Visualization) => {
        this.activeVis = { label: type.label, data };
        this.newVis.emit(this.activeVis);
        this.stepDone();
      });
    }
  }

  /**
   * Increments the step counter
   */
  stepDone() {
    this.step++;
  }

  /**
   * Sets step to a specific value
   * @param target current step
   */
  setStep(target: number) {
    this.step = target;
  }

  /**
   * Determines whether the panel for the current step is to be expanded
   * @param target step of the panel to be expanded
   * @returns boolean to indicate if it should be expanded
   */
  isExpanded(target: number) {
    if (this.step === target) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Determines whether the panel for the current step is to be disabled
   * @param target step of the panel to be disabled
   * @returns boolean to indicate if it should be disabled
   */
  isDisabled(target: number) {
    if (this.step === target || target === this.step - 1) {
      return false;
    } else {
      if (this.mode === 'add') {
        return true;
      }
    }
  }

  /**
   * Closes selection panel and emits the state of the selection panel,
   * the mode in which it was closed and the active visualization when it was closed
   */
  closeSelectionPanel() {
    this.stepDone();
    this.panelState = false;
    this.toggleSelectionPanel({
      state: this.panelState,
      mode: this.mode,
      activeVis: this.activeVis
    });

    this.selectionPanelClosed.emit(this.mode);
  }

  /**
   * Updates record stream mapping
   * @param recordStreamMapping from the graphic-symbol selection stage
   */
  updateRecordStreamMapping(recordStreamMapping: Map<string, RecordStream>) {
    this.recordStreamMapping = recordStreamMapping;
  }

  /**
   * Sets the state of the done button in the graphic variable selection stage
   * @param selectionMade boolean to indicate if a selection was made in the graphic-variable selection stage
   */
  gvSelectionMade(selectionMade: boolean) {
    this.gvSelectionButtonState = selectionMade;
  }

  /**
   * Dispatches the graphic-variable panel opened action in the store
   */
  gvPanelOpened(): void {
    this.store.dispatch(new GVPanelOpened());
  }

  /**
   * Dispatches the graphic-variable panel closed action in the store
   */
  gvPanelClosed(): void {
    this.store.dispatch(new GVPanelClosed());
  }
}
