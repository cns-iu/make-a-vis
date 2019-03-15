// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, QueryList, ViewChild, ViewChildren, EventEmitter, Output } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { find } from 'lodash';
import { map } from 'rxjs/operators';

import { VisualizationComponent, Visualization } from '@dvl-fw/core';
import { ExportService } from '../../shared/services/export/export.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { ModeType, ToggleSelectionPanelType, Vis, VisType } from '../../shared/types';
import { AddNewVisualization, getLoadedProjectSelector, RemoveVisualization,
  SidenavState, SetActiveVisualization,  } from '../../toolbar/shared/store';

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Output() toggleSelectionPanel = new EventEmitter<ToggleSelectionPanelType>();
  @ViewChild('visGroup') visGroup: MatTabGroup;
  @ViewChildren('visualizations') visualizationComponents: QueryList<VisualizationComponent>;

  currentAddVisMode: ModeType;
  visPanelState = false;
  editButtonState = false;
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
  panelOpenState = false;

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
      const visualization  = this.visualizations && this.visualizations.length > 0 ? (this.visualizations[0].data) : undefined;
      this.setSelectedVis(visualizations.length ? 0 : -1, visualization, true);
    });

    updateService.update.pipe(
      map(visualization => this.visualizationComponents.find(comp => comp.data === visualization))
    ).subscribe(component => (component as any).runDataChangeDetection());
  }

  get doesVisExist() {
    return (this.selectedVis > -1 && this.visualizations.length);
  }

  setSelectedVis(index: number, visualization: Visualization, force = false): void {
    if (index !== this.selectedVis || force) {
      this.selectedVis = index;
      this.exportService.visualizationElement = this.visGroup;
      this.store.dispatch(new SetActiveVisualization({visualizationIndex: index, visualization: visualization}));
    }
    this.emitToggleSelectionPanelEvent();
  }

  addNewVisualization(event: any): void {
    const index = this.visualizations.push(event) - 1;
    const visualization = this.visualizations[index];
    this.store.dispatch(new AddNewVisualization({ visualizationIndex: index , visualization: visualization.data }));
    this.setSelectedVis(index, visualization.data);
  }

  removeVisualization(index: number): void {
    const lastIndex = this.visualizations.length - 1;
    const removeVisualization  = this.visualizations[index].data;
    this.visualizations.splice(index, 1);
    this.store.dispatch(new RemoveVisualization({ visualizationIndex: index, visualization: removeVisualization }));

    const selectedVis = this.selectedVis;
    const selectedVisIndex = selectedVis === lastIndex ? lastIndex - 1 : selectedVis;
    if (this.visualizations[selectedVisIndex]) {
      const selectedVisualization = this.visualizations[selectedVisIndex].data;
      this.setSelectedVis(selectedVisIndex , selectedVisualization, true);
    } else {
      this.toggleSelPanel(this.currentAddVisMode);
      this.setSelectedVis(selectedVisIndex , undefined, true);
    }
  }

  toggleSelPanel(mode: ModeType) {
    this.updatePanelState(mode);
    this.updateModeButtonState(mode);

    this.emitToggleSelectionPanelEvent();
  }

  updatePanelState(mode: ModeType) {
    if (!this.currentAddVisMode) {
      this.visPanelState  = true;
    }

    if (this.currentAddVisMode === mode) {
      this.visPanelState = !this.visPanelState;
    } else {
      this.currentAddVisMode = mode;
    }
  }

  updateModeButtonState(mode: ModeType) {
    if (mode === 'add') {
      if (this.visPanelState) {
        this.editButtonState = false;
        this.addIconName = this.addIcons[0];
      } else {
        this.currentAddVisMode = undefined;
        this.addIconName = this.addIcons[1];
      }
    }

    if (mode === 'edit') {
      if (this.doesVisExist) {
        this.addIconName = this.addIcons[1];
        this.editButtonState = !this.editButtonState;

        if (!this.visPanelState) {
          this.currentAddVisMode = undefined;
        }
      } else {
        this.editButtonState = false;
      }
    }
  }

  emitToggleSelectionPanelEvent() {
    this.toggleSelectionPanel.emit({
      state: this.visPanelState,
      mode: this.currentAddVisMode,
      activeVis: this.visPanelState ? this.visualizations[this.selectedVis] : undefined
    });
  }
}
