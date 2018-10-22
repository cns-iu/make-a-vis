import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import {
  GraphicVariableOption, Visualization, GraphicSymbolOption, GraphicSymbol,
  ProjectSerializerService, DvlFwVisualizationComponent, GraphicVariable, DefaultGraphicSymbol, Project
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
    if (this.legendVisualizationTypes.indexOf(template) !== -1 && graphicVariable) {
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
