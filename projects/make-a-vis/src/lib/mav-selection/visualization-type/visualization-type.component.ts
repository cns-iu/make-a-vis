import { Component, EventEmitter, OnInit, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Vis, VisType } from '../../shared/types';

@Component({
  selector: 'mav-selection-visualization-type',
  templateUrl: './visualization-type.component.html',
  styleUrls: ['./visualization-type.component.sass']
})
export class VisualizationTypeComponent implements OnInit, OnChanges {
  @Input() activeVis: Vis;
  @Input() mode: 'add'|'edit';
  @Input() panelState: boolean;
  @Output() visSelected = new EventEmitter<boolean>();
  selected: VisType;
  visTypes: VisType[] = [
    { template: 'scattergraph', label: 'Scatter Graph', icon: 'scatterGraph' },
    { template: 'temporal-bargraph', label: 'Temporal Bar Graph', icon: 'tbg' },
    { template: 'geomap', label: 'Geomap', icon: 'geomap' },
    { template: 'science-map', label: 'Map of Science', icon: 'mapOfScience' },
    { template: 'network', label: 'Network', icon: 'network' },
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('panelState' in changes && !this.panelState) {
      this.selected = undefined;
    }
  }

  visualizationSelected(type: VisType) {
    this.selected = type;
    if (this.selected) {
      this.visSelected.emit(true);
    } else {
      this.visSelected.emit(false);
    }
  }

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
