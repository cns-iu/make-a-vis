import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphicVariableOption, GraphicVariable, GraphicSymbol, Visualization } from '@dvl-fw/core';

import { LegendService } from '../../shared/services/legend/legend.service';

/**
 * mav-graphic-variable-icon component declaration, responsible for showing the icons for graphic-variables
 */
@Component({
  selector: 'mav-graphic-variable-icon',
  templateUrl: './graphic-variable-icon.component.html',
  styleUrls: ['./graphic-variable-icon.component.scss']
})
export class GraphicVariableIconComponent implements OnInit, OnChanges {

  /**
   * Input of graphic-variable-option whose icon is to be displayed
   */
  @Input() graphicVariableOption: GraphicVariableOption;
  /**
   * Input of graphic-symbol-option to which the graphic-variable-option belongs
   */
  @Input() graphicSymbolOption: GraphicSymbol;
  /**
   * Input of active visualization
   */
  @Input() visualization: Visualization;
  /**
   * Input boolean to indicate if the visualization is static/dynamic
   */
  @Input() isStaticVisualization = true;
  /**
   * icon visualization instance
   */
  legend: Visualization;

  /**
   * graphic-variable whose icon is to be displayed
   */
  graphicVariable: GraphicVariable;

  /**
   * Creates an instance of graphic variable icon component.
   * @param legendService instance of LegendService
   */
  constructor(private legendService: LegendService) { }

  /**
   * init lifecycle hook for this component, invokes createIcon() method
   */
  ngOnInit() {
    this.createIcon();
  }

  /**
   * on changes lifecycle hook of this component
   * @param changes The changed properties object
   */
  ngOnChanges(changes: SimpleChanges) {
    this.createIcon();
  }

  /**
   * Creates the icon
   */
  createIcon() {
    if (!this.visualization) { return; }
    const graphicSymbol: GraphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id ||
      this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;
    const template = this.isStaticVisualization ?
      (this.graphicVariableOption.staticVisualization || this.graphicVariableOption.visualization) :
      this.graphicVariableOption.visualization;
    if (!!template) {
      this.legendService.createLegend(template, graphicVariable, graphicSymbol).subscribe((legend) => {
        legend.graphicSymbols = {}; // Clear symbol since this is a static legend
        this.legend = legend;
      });
    }
  }
}
