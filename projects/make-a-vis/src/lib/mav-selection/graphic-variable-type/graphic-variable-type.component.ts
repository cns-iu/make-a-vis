import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniqueId } from 'lodash';

import { DataVariable, GraphicSymbolOption, GraphicVariable,
  GraphicVariableOption, RecordStream, GraphicSymbol, Visualization, ProjectSerializerService } from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { Vis } from '../../shared/types';
import { getAvailableGraphicVariablesSelector, SidenavState, getLoadedProjectSelector } from '../../toolbar/shared/store';

@Component({
  selector: 'mav-selection-graphic-variable-type',
  templateUrl: './graphic-variable-type.component.html',
  styleUrls: ['./graphic-variable-type.component.sass']
})
export class GraphicVariableTypeComponent implements OnInit, OnChanges {
  @Input() activeVis: Vis;
  @Input() recordStream: Map<string, RecordStream>;
  graphicSymbolTypes: GraphicSymbolOption[] = [];
  selectionClass = '';
  availableGraphicVariables: GraphicVariable[];
  isStaticVisualization = true;
  selectedDataVariables: Map<string, Map<string, DataVariable>>;
  legent: Visualization;

  constructor(private store: Store<SidenavState>, private updateService: UpdateVisService, private serializer: ProjectSerializerService) {
    this.store.pipe(select(getAvailableGraphicVariablesSelector)).subscribe((availableGraphicVariables) => {
      this.availableGraphicVariables = availableGraphicVariables;
    });
  }

  ngOnInit() {
    this.createIcon(this.activeVis.data, this.graphicSymbolTypes[index]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes) {
      if (this.activeVis && Object.keys(this.activeVis.data.graphicSymbols).length) {
        this.graphicSymbolTypes = [];
        this.selectedDataVariables = new Map();
        this.getGraphicVariableOptions();
        this.getDataVariables();
      }
    }
  }

  dataVariableDropped(dataVariable: DataVariable, graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    const mappableGraphicVariables = this.getGraphicVariable(dataVariable, graphicVariableOption, graphicSymbolOption);
    if (mappableGraphicVariables.length) {
      this.updateService.updateGraphicVariable(this.activeVis.data, graphicSymbolOption.id,
        graphicVariableOption.id || graphicVariableOption.type, mappableGraphicVariables[0]);

      if (this.selectedDataVariables.get(graphicSymbolOption.id)) {
        this.selectedDataVariables.get(graphicSymbolOption.id).set(graphicVariableOption.id || graphicVariableOption.type, dataVariable);
      } else {
        this.selectedDataVariables.set(
          graphicSymbolOption.id,
          new Map().set(graphicVariableOption.id || graphicVariableOption.type, dataVariable)
        );
      }
    }
  }

  getGraphicVariable(
    dataVariable: DataVariable,
    graphicVariableOption: GraphicVariableOption,
    graphicSymbolOption: GraphicSymbolOption
  ): GraphicVariable[] {
    if (this.availableGraphicVariables.length) {
      const filteredGVs: GraphicVariable[] = this.availableGraphicVariables.filter((gv) => {
        return ((gv.type && gv.type === graphicVariableOption.type)
        && (gv.recordStream.id === this.recordStream.get(graphicSymbolOption.id).id)
        && (gv.dataVariable.id === dataVariable.id));
      });
      return filteredGVs;
    }
  }

  getGraphicVariableOptions() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs) => {
      this.graphicSymbolTypes.push(this.activeVis.data.graphicSymbolOptions.filter((gso) => gso.id === gs)[0]);
    });
    console.log('graphic symbol');
    console.log(this.graphicSymbolTypes);
  }

  getDataVariables() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gs: string) => {
      const gvs = Object.keys(this.activeVis.data.graphicSymbols[gs].graphicVariables);
      if (gvs.length) {
       gvs.forEach((gv: string) => {
        const dv = this.activeVis.data.graphicSymbols[gs].graphicVariables[gv].dataVariable;
        const mapEntry = this.selectedDataVariables.get(gs);
        if (mapEntry) {
          mapEntry.set(gv, dv);
        } else {
          this.selectedDataVariables.set(gs, new Map().set(gv, dv));
        }
       });
      }
    });
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  acceptsDrop(graphicVariableOption: GraphicVariableOption, graphicSymbolOption: GraphicSymbolOption) {
    return (dataVariable: DataVariable) => {
      return this.getGraphicVariable(dataVariable, graphicVariableOption, graphicSymbolOption).length > 0;
    };
  }

  unsetGraphicVariable(graphicSymbolOptionId: string, graphicVariableOptionIdOrType: string) {
    this.updateService.unsetGraphicVariable(this.activeVis.data, graphicSymbolOptionId, graphicVariableOptionIdOrType);
    this.selectedDataVariables.get(graphicSymbolOptionId).delete(graphicVariableOptionIdOrType);
  }

  private createIcon(visualization, graphicSymbolOption, graphicVariableOption, isStaticVisualization) {
    if (visualization) { return; }
    const graphicSymbol: GraphicSymbol = visualization.graphicSymbols[graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable: GraphicVariable = graphicSymbol.graphicVariables[graphicVariableOption.id ||
      graphicVariableOption.type];

    const template = isStaticVisualization ?
                      (graphicVariableOption.staticVisualization || graphicVariableOption.visualization ) :
    graphicVariableOption.visualization;
    // this.legendVisualizationType = template;
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
          console.log('legend');
          console.log(this.legend);
          // this.legendComponent.data = legend;
          // this.legendComponent.runDataChangeDetection();
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
