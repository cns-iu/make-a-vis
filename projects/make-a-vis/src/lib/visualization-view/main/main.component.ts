// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, QueryList, ViewChild, ViewChildren, EventEmitter, Output } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { find, uniqueId } from 'lodash';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, take } from 'rxjs/operators';

import { ProjectSerializerService, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { ExportService } from '../../shared/services/export/export.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import {
  AddNewVisualization, getLoadedProjectSelector, RemoveVisualization,
  SidenavState, SetActiveVisualization
} from '../../toolbar/shared/store';

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
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Output() toggleAddVis = new EventEmitter<boolean>();
  @ViewChild('visGroup') visGroup: MatTabGroup;
  @ViewChildren('visualizations') visualizationComponents: QueryList<VisualizationComponent>;

  addVizSidenavState = false;

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
    private store: Store<SidenavState>,
    private serializer: ProjectSerializerService,
    private exportService: ExportService,
    updateService: UpdateVisService
  ) {
    this.store.pipe(
      select(getLoadedProjectSelector),
      map(project => project && project.visualizations || []),
      map(visualizations => visualizations.map(vis => {
        const type = find(this.visTypes, { template: vis.template });
        const label = type && type.label || vis.id || '';
        return { label, data: vis } as Vis;
      }))
    ).subscribe(visualizations => {
      this.visualizations = visualizations;
      this.setSelectedVis(visualizations.length ? 0 : -1, true);
    });

    updateService.update.pipe(
      map(visualization => this.visualizationComponents.find(comp => comp.data === visualization))
    ).subscribe(component => (component as any).runDataChangeDetection());
  }

  setSelectedVis(index: number, force = false): void {
    if (index !== this.selectedVis || force) {
      this.selectedVis = index;
      this.exportService.visualizationElement = this.visGroup;
      this.store.dispatch(new SetActiveVisualization(index));
    }
  }

  addNewVisualization(event: any): void {
    const index = this.visualizations.push(event) - 1;
    this.setSelectedVis(index);
  }

  removeVisualization(index: number): void {
    const lastIndex = this.visualizations.length - 1;
    this.visualizations.splice(index, 1);
    this.store.dispatch(new RemoveVisualization(index));
    this.setSelectedVis(index === lastIndex ? index - 1 : index, true);
  }

  toggleAddVisualization() {
    this.addVizSidenavState = !this.addVizSidenavState;
    this.toggleAddVis.emit(this.addVizSidenavState);
  }
}
