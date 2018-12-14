// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, QueryList, ViewChild, ViewChildren, EventEmitter, Output } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { find } from 'lodash';
import { map } from 'rxjs/operators';

import { VisualizationComponent } from '@dvl-fw/core';
import { ExportService } from '../../shared/services/export/export.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { ModeType, ToggleAddVisType, Vis, VisType } from '../../shared/types';
import { getLoadedProjectSelector, RemoveVisualization, SidenavState, SetActiveVisualization } from '../../toolbar/shared/store';

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Output() toggleAddVis = new EventEmitter<ToggleAddVisType>();
  @ViewChild('visGroup') visGroup: MatTabGroup;
  @ViewChildren('visualizations') visualizationComponents: QueryList<VisualizationComponent>;

  currentAddVisMode: ModeType;
  addVisPanelState = false;
  addIcons = ['add_circle', 'add_circle_outline'];
  addIconName = this.addIcons[1];
  visTypes: VisType[] = [
    { template: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { template: 'geomap', label: 'Geomap', icon: 'geomap' },
    { template: 'science-map', label: 'Map of Science', icon: 'mapOfScience' },
    { template: 'network', label: 'Network', icon: 'network' },
    { template: 'temporal-bargraph', label: 'Temporal Bar Graph', icon: 'hbg' }
  ];
  visualizations: Vis[] = [];
  selectedVis = -1;

  constructor(private store: Store<SidenavState>, private exportService: ExportService, updateService: UpdateVisService) {
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
    this.emitToggleAddVisEvent();
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

  toggleAddVisualization(mode: ModeType) {
    if (!this.currentAddVisMode) {
      this.addVisPanelState  = true;
    }

    if (this.currentAddVisMode === mode) {
      this.addVisPanelState = !this.addVisPanelState;
    } else {
      this.currentAddVisMode = mode;
    }

    if (mode === 'add') {
      if (this.addVisPanelState) {
        this.addIconName = this.addIcons[0];
      } else {
        this.currentAddVisMode = undefined;
        this.addIconName = this.addIcons[1];
      }
    }

    if (mode === 'edit') {
      this.addIconName = this.addIcons[1];
      if (this.addVisPanelState) {
        // set right icon name
      } else {
        this.currentAddVisMode = undefined;
        // set right icon name
      }
    }

    this.emitToggleAddVisEvent();
  }

  emitToggleAddVisEvent() {
    this.toggleAddVis.emit({
      state: this.addVisPanelState,
      mode: this.currentAddVisMode,
      activeVis: this.addVisPanelState ? this.visualizations[this.selectedVis] : undefined
    });
  }
}
