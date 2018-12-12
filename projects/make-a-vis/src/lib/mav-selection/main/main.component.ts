import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';
import { of } from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';

import { ProjectSerializerService, Visualization } from '@dvl-fw/core';
import { getLoadedProjectSelector, SidenavState, AddNewVisualization } from '../../toolbar/shared/store';
import { VisType, VisualizationTypeComponent } from '../visualization-type/visualization-type.component';

export interface Vis {
  label: string;
  data: Visualization;
}

@Component({
  selector: 'mav-selection',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Output() newVis = new EventEmitter();
  @ViewChild('visType') visType: VisualizationTypeComponent;
  openMavSideNav = false;

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) { }

  ngOnInit() {
  }

  toggleAddVis(state: boolean) {
    this.openMavSideNav = state;
  }

  addVisualization(type: VisType) {
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
