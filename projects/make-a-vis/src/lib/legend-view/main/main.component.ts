// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { GraphicSymbolOption, GraphicVariable, GraphicVariableOption,
  Project, RecordStream, Visualization, GraphicSymbol } from '@dvl-fw/core';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { ApplicationState, getUiFeature } from '../../shared/store';

export interface Group {
  option: GraphicSymbolOption;
  index: number;
}

@Component({
  selector: 'mav-legend-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  streams: RecordStream[];
  groups: Group[] = [];

  visualization: Visualization;

  private lastActiveVisualizationIndex: number;
  private lastProject: Project;

  constructor(private store: Store<ApplicationState>, private updateService: UpdateVisService) {
    store.pipe(select(getUiFeature)).subscribe(({ activeVisualization, project }) => {
      this.lastActiveVisualizationIndex = activeVisualization.visualizationIndex;
      this.lastProject = project;
      this.setState(project, activeVisualization.visualizationIndex);
    });
  }

  onStreamChange(group: Group, index: number) {
    const { streams, updateService, visualization } = this;
    const { id, type } = group.option;
    if (visualization) {
      updateService.updateGraphicSymbol(visualization, id, type, streams[index]);
    }
  }

  onGraphicVariableChange(group: Group, option: GraphicVariableOption, gv: GraphicVariable): void {
    const  { updateService, visualization } = this;
    const id = option.id || option.type;
    if (visualization) {
      updateService.updateGraphicVariable(visualization, group.option.id, id, gv);
    }
  }

  private setState(project: Project, index: number): void {
    const visualization = this.visualization = project && index >= 0 && project.visualizations[index];
    if (project) {
      this.setStreams(project);
      if (visualization) {
        this.setGroups(visualization);
      } else {
        this.groups = [];
      }
    } else {
      this.streams = [];
      this.groups = [];
    }
  }

  private setStreams(project: Project): void {
    this.streams = project.dataSources
      .map(source => source.recordStreams)
      .reduce((acc, s) => acc.concat(s), [] as RecordStream[]);
  }

  private setGroups(visualization: Visualization): void {
    const { graphicSymbolOptions: options, graphicSymbols } = visualization;
    this.groups = [];

    if (options) {
      options.forEach(option => {
        const symbol = graphicSymbols[option.id];
        const index = symbol ? this.streams.indexOf(symbol.recordStream) : -1;
        if (symbol && this.hasSetGraphicVariables(symbol)) {
          this.groups.push({ option, index });
        }
      });
    }
  }

  private hasSetGraphicVariables(graphicSymbol: GraphicSymbol): boolean {
    return Object.entries(graphicSymbol.graphicVariables).length > 0;
  }
}
