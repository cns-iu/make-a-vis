import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DefaultGraphicSymbol, GraphicSymbol, GraphicVariable, ProjectSerializerService, Project, Visualization } from '@dvl-fw/core';
import { Subject } from 'rxjs';
import { uniqueId } from 'lodash';

import { getLoadedProjectSelector, SidenavState } from '../../../toolbar/shared/store';

@Injectable({
  providedIn: 'root'
})
export class LegendService {

  constructor(private store: Store<SidenavState>, private serializer: ProjectSerializerService) {}

  public createLegend(template, gv, gs): Subject<Visualization> {
    const visSubject = new Subject<Visualization>();
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
      )
      .subscribe((legend) => {
        legend.graphicSymbols.items = this.generateLegendGraphicSymbol(template, gv, gs, project);
        visSubject.next(legend);
      });
    });
    return visSubject;
  }

  private generateLegendGraphicSymbol(template: string, graphicVariable: GraphicVariable,
    sourceGraphicSymbol: GraphicSymbol, project: Project): GraphicSymbol {

    const graphicSymbol: GraphicSymbol = new DefaultGraphicSymbol({
      id: 'items', type: sourceGraphicSymbol.type, recordStream: sourceGraphicSymbol.recordStream.id,
      graphicVariables: {}
    }, project);

    if (graphicVariable) {
      const gvars = graphicSymbol.graphicVariables;
      if (graphicVariable) {
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
      }
    }
    return graphicSymbol;
  }
}
