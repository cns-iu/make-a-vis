import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DvlFwVisualizationComponent } from '@dvl-fw/angular';
import { GraphicSymbol, GraphicSymbolOption, GraphicVariable, GraphicVariableOption, Visualization } from '@dvl-fw/core';

import { LegendService } from '../../shared/services/legend/legend.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';

@Component({
  selector: 'mav-graphic-variable-legend',
  templateUrl: './graphic-variable-legend.component.html',
  styleUrls: ['./graphic-variable-legend.component.scss']
})
export class GraphicVariableLegendComponent implements OnInit, OnChanges {
  @Input() hideIfUnset = false; // Hide the GV legend if its not been set in the visualization
  @Input() graphicSymbolOption: GraphicSymbolOption;
  @Input() graphicVariableOption: GraphicVariableOption;
  @Input() visualization: Visualization;
  legend: Visualization;

  graphicVariable: GraphicVariable;
  legendVisualizationType: string;

  @ViewChild('visualization', { static: false }) legendComponent: DvlFwVisualizationComponent;

  constructor(private updateService: UpdateVisService, private legendService: LegendService) { }

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
    const graphicSymbol: GraphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id ||
        this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;

    const template = this.graphicVariableOption.visualization;
    this.legendVisualizationType = template;
    if (!!template && graphicVariable) {
      this.legendService.createLegend(template, graphicVariable, graphicSymbol).subscribe((legend) => {
        this.updateLegend(legend);
      });
    } else if (this.legendComponent) {
      this.updateLegend();
    }
  }

  private updateLegend(legend?: Visualization) {
    this.legend = legend;
    this.legendComponent.data = legend;
    this.legendComponent.runDataChangeDetection();
  }
}
