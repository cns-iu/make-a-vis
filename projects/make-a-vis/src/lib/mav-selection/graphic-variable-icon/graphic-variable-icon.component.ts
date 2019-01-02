import { Component, OnInit, Input } from '@angular/core';
import { GraphicSymbolOption, GraphicVariableOption, GraphicVariable, GraphicSymbol,
  ProjectSerializerService, Project, Visualization, DefaultGraphicSymbol,  } from '@dvl-fw/core';
import { uniqueId } from 'lodash';
import { select, Store } from '@ngrx/store';

import { getLoadedProjectSelector, SidenavState } from '../../toolbar/shared/store';

@Component({
  selector: 'mav-graphic-variable-icon',
  templateUrl: './graphic-variable-icon.component.html',
  styleUrls: ['./graphic-variable-icon.component.css']
})
export class GraphicVariableIconComponent implements OnInit {

  @Input() graphicVariableOption: GraphicVariableOption;
  @Input() graphicSymbolOption: GraphicSymbol;
  @Input() visualization: Visualization;
  @Input() isStaticVisualization = true;
  legend: Visualization;

  graphicVariable: GraphicVariable;

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) { }

  ngOnInit() {
    this.createIcon();
  }

  private createIcon() {
    if (!this.visualization) { return; }
    const graphicSymbol: GraphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id ||
      this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;

    const template = this.isStaticVisualization ?
                      (this.graphicVariableOption.staticVisualization || this.graphicVariableOption.visualization ) :
    this.graphicVariableOption.visualization;
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
          template, preData, project
        ).subscribe((legend) => {
          legend.graphicSymbols.items = this.generateLegendGraphicSymbol(template, graphicVariable, graphicSymbol, project);
          this.legend = legend;
        });
      });
    }
  }

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
