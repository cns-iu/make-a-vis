import { Component, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';
import { of } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';

import { ProjectSerializerService, Visualization } from '@dvl-fw/core';
import { ModeType, ToggleAddVisType, Vis, VisType } from '../../shared/types';
import {
  AddNewVisualization,
  getLoadedProjectSelector,
  SidenavState
} from '../../toolbar/shared/store';
import { VisualizationTypeComponent } from '../visualization-type/visualization-type.component';


@Component({
  selector: 'mav-selection',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  @Output() newVis = new EventEmitter();
  @ViewChild('visType') visType: VisualizationTypeComponent;
  mode: ModeType;
  activeVis: Vis;
  panelState = false;
  step = 0;

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) { }

  ngOnInit() {
  }

  toggleAddVis(eventArgs: ToggleAddVisType) {
    this.panelState = eventArgs.state;
    this.mode = eventArgs.mode;
    this.activeVis = eventArgs.activeVis;

    if (this.mode === 'add') {
      this.step = 0;
    }

    if (this.mode === 'edit') {
      this.step = 1;
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
        this.store.dispatch(new AddNewVisualization(data));
        this.activeVis = { label: type.label, data };
        this.newVis.emit(this.activeVis);
        this.stepDone();
      });
    }
  }

  stepDone() {
    this.step++;
  }
}
