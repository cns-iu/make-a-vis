import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Vis, VisType } from '../../shared/types';

/**
 * Visualization type component declaration, responsible for showing visualization type options in mav-selection
 */
@Component({
  selector: 'mav-selection-visualization-type',
  templateUrl: './visualization-type.component.html',
  styleUrls: ['./visualization-type.component.scss']
})
export class VisualizationTypeComponent implements OnChanges {
  /**
   * Input for the visualization currently active, or being viewed by the user
   */
  @Input() activeVis: Vis;
  /**
   * Input for the currently selected mode by the user
   */
  @Input() mode: 'add'|'edit';
  /**
   * Input for the state of the selection panel
   */
  @Input() panelState: boolean;
  /**
   * Output vis type selection event-emitter
   */
  @Output() visSelected = new EventEmitter<boolean>();
  /**
   * Vis type selected
   */
  selected: VisType;
  /**
   * Available Vis types for selection
   */
  visTypes: VisType[] = [
    { template: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { template: 'temporal-bargraph', label: 'Temporal Bar Graph', icon: 'tbg' },
    { template: 'geomap', label: 'Geomap', icon: 'geomap' },
    { template: 'science-map', label: 'Map of Science', icon: 'mapOfScience' },
    { template: 'network', label: 'Network', icon: 'network' },
  ];

  /**
   * on changes lifecycle hook for visualization-type component
   * Detects changes in input panel-state property
   * @param changes The changed properties object
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('panelState' in changes && !this.panelState) {
      this.selected = undefined;
    }
  }

  /**
   * Emits true or false based on if a visualization has been selected
   * @param type visualization-type selected
   */
  visualizationSelected(type: VisType) {
    this.selected = type;
    if (this.selected) {
      this.visSelected.emit(true);
    } else {
      this.visSelected.emit(false);
    }
  }

  /**
   * Determines whether a vis-type is selected by the user
   * @param type vis-type of the mat-card
   * @returns true if the vis-type is selected by the user
   */
  isSelected(type: VisType): boolean {
    if (this.mode === 'add') {
      if (type && this.selected) {
        if (type.template === this.selected.template) {
          return true;
        }
      }
    }

    if (this.mode === 'edit') {
      if (this.activeVis) {
        if (type.template === this.activeVis.data.template) {
          return true;
        }
      }
    }
  }
}
