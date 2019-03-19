import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphicVariableOption, GraphicVariable, GraphicSymbol, Visualization } from '@dvl-fw/core';

import { LegendService } from '../../shared/services/legend/legend.service';

@Component({
  selector: 'mav-graphic-variable-icon',
  templateUrl: './graphic-variable-icon.component.html',
  styleUrls: ['./graphic-variable-icon.component.scss']
})
export class GraphicVariableIconComponent implements OnInit, OnChanges {

  @Input() graphicVariableOption: GraphicVariableOption;
  @Input() graphicSymbolOption: GraphicSymbol;
  @Input() visualization: Visualization;
  @Input() isStaticVisualization = true;
  legend: Visualization;

  graphicVariable: GraphicVariable;

  constructor(private legendService: LegendService) { }

  ngOnInit() {
    this.createIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.createIcon();
  }

  createIcon() {
    if (!this.visualization) { return; }
    const graphicSymbol: GraphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id ||
      this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;
    const template = this.isStaticVisualization ?
                      (this.graphicVariableOption.staticVisualization || this.graphicVariableOption.visualization ) :
    this.graphicVariableOption.visualization;
    if (!!template) {
      this.legendService.createLegend(template, graphicVariable, graphicSymbol).subscribe((legend) => {
        legend.graphicSymbols = {}; // Clear symbol since this is a static legend
        this.legend = legend;
    });
    }
  }

}
