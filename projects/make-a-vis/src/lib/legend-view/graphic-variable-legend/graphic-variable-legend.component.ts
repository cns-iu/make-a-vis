import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import {
  GraphicVariableOption, Visualization, GraphicSymbolOption,
  ProjectSerializerService, DvlFwVisualizationComponent, GraphicVariable
} from 'dvl-fw';

import { uniqueId } from 'lodash';
import { mergeMap} from 'rxjs/operators';

import { SidenavState, getLoadedProjectSelector } from '../../toolbar/shared/store';
import { Store, select } from '@ngrx/store';

import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';

@Component({
  selector: 'mav-graphic-variable-legend',
  templateUrl: './graphic-variable-legend.component.html',
  styleUrls: ['./graphic-variable-legend.component.css']
})
export class GraphicVariableLegendComponent implements OnInit, OnChanges {
  @Input() graphicSymbolOption: GraphicSymbolOption;
  @Input() graphicVariableOption: GraphicVariableOption;
  @Input() visualization: Visualization;
  legend: Visualization;

  graphicVariable: GraphicVariable;
  legendVisualizationTypes = ['color', 'edge-size', 'node-size'];
  legendVisualizationType: string;

  @ViewChild('visualization') legendComponent: DvlFwVisualizationComponent;

  constructor(private store: Store<SidenavState>, private updateService: UpdateVisService, private serializer: ProjectSerializerService) { }

  ngOnInit() {
    this.updateService.update.subscribe((visualization) => {
      this.visualization = visualization;
      this.visualizationUpdated();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('visualization')) {
      this.visualizationUpdated();
    }
  }

  private visualizationUpdated() {
    if (!this.visualization) { return; }
    const graphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id || this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;

    const template = this.graphicVariableOption.visualization;
    this.legendVisualizationType = template;
    if (this.legendVisualizationTypes.indexOf(template) !== -1) {
      const preData: any = {
        id: `legend-visualization-${uniqueId()}`,
        template,
        properties: {},
        graphicSymbols: {
          items: graphicSymbol.id
        }
      };
      this.store.pipe(
        select(getLoadedProjectSelector),
        mergeMap(project => this.serializer.createVisualization(
          this.graphicVariableOption.visualization, preData, project))
      ).subscribe(legend => {
        this.legend = legend;
        this.legendComponent.data = legend;
        this.legendComponent.runDataChangeDetection();
      });
    } else if (this.legendComponent) {
      this.legend = undefined; // TODO
      this.legendComponent.data = undefined; // TODO
      this.legendComponent.runDataChangeDetection();
    }
  }
}
