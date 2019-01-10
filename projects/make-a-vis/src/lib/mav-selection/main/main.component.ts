import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';
import { of } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';

import { ProjectSerializerService, RecordStream, Visualization } from '@dvl-fw/core';
import { ModeType, ToggleSelectionPanelType, Vis, VisType } from '../../shared/types';
import { getLoadedProjectSelector, SidenavState } from '../../toolbar/shared/store';
import { VisualizationTypeComponent } from '../visualization-type/visualization-type.component';

@Component({
  selector: 'mav-selection',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  @Output() newVis = new EventEmitter();
  @Output() selectionPanelClosed = new EventEmitter();
  @ViewChild('visType') visType: VisualizationTypeComponent;
  recordStreamMapping: Map<string, RecordStream>;
  mode: ModeType;
  activeVis: Vis;
  panelState = false;
  step = 0;
  visSelectionButtonState = false;
  gvSelectionButtonState = false;

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) { }

  ngOnInit() {
  }

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

    this.setVisSelectionButtonState(false);
  }

  setVisSelectionButtonState(visSelected: boolean) {
    if (this.mode === 'add') {
      this.visSelectionButtonState = visSelected;
    }

    if (this.mode === 'edit') {
      this.visSelectionButtonState = false;
    }
  }

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

  stepDone() {
    this.step++;
  }

  setStep(target: number) {
    this.step = target;
  }

  isExpanded(target: number) {
    if (this.step === target) {
      return true;
    } else {
      return false;
    }
  }

  isDisabled(target: number) {
    if (this.step === target || target === this.step - 1) {
      return false;
    } else {
      if (this.mode === 'add') {
        return true;
      }
    }
  }

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

  updateRecordStreamMapping(recordStreamMapping: Map<string, RecordStream>) {
    this.recordStreamMapping = recordStreamMapping;
  }

  gvSelectionMade(selectionMade: boolean) {
    this.gvSelectionButtonState = selectionMade;
  }
}
