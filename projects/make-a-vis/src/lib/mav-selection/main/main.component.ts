import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
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
  @ViewChild('visTypeExpansion') visTypePanel: MatExpansionPanel;
  @ViewChild('visType') visType: VisualizationTypeComponent;
  panelState = false;
  mode: ModeType;
  activeVis: Vis;

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) { }

  ngOnInit() {
  }

  toggleAddVis(eventArgs: ToggleAddVisType) {
    this.panelState = eventArgs.state;
    this.mode = eventArgs.mode;
    this.activeVis = eventArgs.activeVis;
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
        this.newVis.emit({ label: type.label, data });
      });
    }
  }
}
