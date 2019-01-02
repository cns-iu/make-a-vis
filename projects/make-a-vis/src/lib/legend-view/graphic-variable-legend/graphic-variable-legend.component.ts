// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { uniqueId } from 'lodash';
import { select, Store } from '@ngrx/store';

import {
  DefaultGraphicSymbol, DvlFwVisualizationComponent, GraphicSymbol, GraphicSymbolOption,
  GraphicVariable, GraphicVariableOption, Project, ProjectSerializerService, Visualization
} from '@dvl-fw/core';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { getLoadedProjectSelector, SidenavState } from '../../toolbar/shared/store';

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
    const graphicSymbol: GraphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id ||
        this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;

    const template = this.graphicVariableOption.visualization;
    this.legendVisualizationType = template;
    if (!!template && graphicVariable) {
      const preData: any = {
        id: `legend-visualization-${uniqueId()}`,
        template,
        properties: {},
        graphicSymbols: {}
      };
      this.store.pipe(
        select(getLoadedProjectSelector)
      ).subscribe(project => {
        this.serializer.createVisualization(
          this.graphicVariableOption.visualization, preData, project
        ).subscribe((legend) => {
          legend.graphicSymbols.items = this.generateLegendGraphicSymbol(template, graphicVariable, graphicSymbol, project);
          this.legend = legend;
          this.legendComponent.data = legend;
          this.legendComponent.runDataChangeDetection();
        });
      });
    } else if (this.legendComponent) {
      this.legend = undefined; // TODO
      this.legendComponent.data = undefined; // TODO
      this.legendComponent.runDataChangeDetection();
    }
  }

  /* Create a graphic symbol that encodes everything by a given graphicVariable's source data variable */
  private generateLegendGraphicSymbol(template: string, graphicVariable: GraphicVariable,
      sourceGraphicSymbol: GraphicSymbol, project: Project): GraphicSymbol {
    const graphicSymbol: GraphicSymbol = new DefaultGraphicSymbol({
      id: 'items', type: sourceGraphicSymbol.type, recordStream: sourceGraphicSymbol.recordStream.id,
      graphicVariables: {}
    }, project);

    const gvars = graphicSymbol.graphicVariables;
    gvars[graphicVariable.type] = graphicVariable;
    if (template === 'color') {
      gvars.color = graphicVariable;
    }
    gvars.identifier = sourceGraphicSymbol.graphicVariables.identifier;
    for (const gv of project.graphicVariables) {
      if (gv.dataVariable === graphicVariable.dataVariable && !gvars[gv.type]) {
        gvars[gv.type] = gv;
      }
    }
    return graphicSymbol;
  }
}
