import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';

import { Visualization } from 'dvl-fw';
import { ExportService } from '../../shared/services/export/export.service';
import {
  VisualizationState,
  AddNewVisualization, RemoveVisualization, SetActiveVisualization
} from '../shared/store';

export interface Vis {
  label: string;
  data: Visualization;
}

export interface VisType {
  type: string;
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
    { type: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { type: 'geomap', label: 'Geomap', icon: 'geomap' },
    { type: '', label: 'Map of Science', icon: 'mapOfScience' }, // FIXME: Correct type
    { type: 'network', label: 'Network', icon: 'network' },
    { type: '', label: 'Horizontal Bar Graph', icon: 'hbg' } // FIXME: Correct type
  ];

  visualizations: Vis[] = [];
  selectedVis = -1;

  constructor(private exportService: ExportService, private store: Store<VisualizationState>) { }

  setSelectedVis(index: number, force = false): void {
    if (index !== this.selectedVis || force) {
      this.selectedVis = index;
      this.exportService.visualizationElement = this.visualization;
      this.store.dispatch(new SetActiveVisualization(index));
    }
  }

  addNewVisualization(type: VisType): void {
    // TODO: add visualization to state
    const data = { } as Visualization; // TODO: create data
    const index = this.visualizations.push({ label: type.label, data }) - 1;
    this.store.dispatch(new AddNewVisualization(data));
    this.setSelectedVis(index);
  }

  removeVisualization(index: number): void {
    const lastIndex = this.visualizations.length - 1;
    this.visualizations.splice(index, 1);
    this.store.dispatch(new RemoveVisualization(index));
    this.setSelectedVis(index === lastIndex ? index - 1 : index, true);
  }
}
