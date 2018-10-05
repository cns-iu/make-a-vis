import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, onErrorResumeNext, take } from 'rxjs/operators';
import { find, unary, uniqueId } from 'lodash';

import { ProjectSerializerService, Visualization } from 'dvl-fw';
import { ExportService } from '../../shared/services/export/export.service';
import { SidenavState, getLoadedProjectSelector } from '../../toolbar/shared/store';
import {
  VisualizationState,
  AddNewVisualization, RemoveVisualization, SetActiveVisualization
} from '../shared/store';

export interface Vis {
  label: string;
  data: Visualization;
}

export interface VisType {
  template: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('visualization') visualization: MatTabGroup;

  visTypes: VisType[] = [
    { template: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { template: 'geomap', label: 'Geomap', icon: 'geomap' },
    { template: 'science-map', label: 'Map of Science', icon: 'mapOfScience' },
    { template: 'network', label: 'Network', icon: 'network' },
    { template: 'temporal-bargraph', label: 'Temporal Bar Graph', icon: 'hbg' }
  ];

  visualizations: Vis[] = [];
  selectedVis = -1;

  constructor(
    private store: Store<VisualizationState>,
    private uistore: Store<SidenavState>,
    private serializer: ProjectSerializerService,
    private exportService: ExportService
  ) {
    this.uistore.pipe(
      select(getLoadedProjectSelector),
      map(project => project && project.visualizations || []),
      map(visualizations => visualizations.map(vis => {
        const type = find(this.visTypes, { template: vis.template });
        const label = type && type.label || '';
        return { label, data: vis } as Vis;
      }))
    ).subscribe(visualizations => {
      this.visualizations = visualizations;
      this.selectedVis = visualizations.length ? 0 : -1;
    });
  }

  setSelectedVis(index: number, force = false): void {
    if (index !== this.selectedVis || force) {
      this.selectedVis = index;
      this.exportService.visualizationElement = this.visualization;
      this.store.dispatch(new SetActiveVisualization(index));
    }
  }

  addNewVisualization(type: VisType): void {
    const preData: Partial<Visualization> = {
      id: `visualization-${uniqueId()}`,
      template: type.template,
      properties: {},
      graphicSymbols: {}
    };

    this.uistore.pipe(
      select(getLoadedProjectSelector),
      take(1),
      concatMap(project => this.serializer.createVisualization(type.template, preData, project)),
      onErrorResumeNext(of(preData as Visualization))
    ).subscribe(data => {
      const index = this.visualizations.push({ label: type.label, data }) - 1;
      this.store.dispatch(new AddNewVisualization(data));
      this.setSelectedVis(index);
    });
  }

  removeVisualization(index: number): void {
    const lastIndex = this.visualizations.length - 1;
    this.visualizations.splice(index, 1);
    this.store.dispatch(new RemoveVisualization(index));
    this.setSelectedVis(index === lastIndex ? index - 1 : index, true);
  }
}
