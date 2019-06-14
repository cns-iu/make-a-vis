// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';

import { GraphicSymbolOption, GraphicVariable, GraphicVariableOption,
  Project, RecordStream, Visualization, GraphicSymbol } from '@dvl-fw/core';
import { getAdvancedEnabledSelector, MavSelectionState } from '../../mav-selection/shared/store';
import { AdvancedService } from '../../shared/services/advance/advanced.service';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { ApplicationState, getUiFeature } from '../../shared/store';


export interface Group {
  option: GraphicSymbolOption;
  index: number;
}

@Component({
  selector: 'mav-legend-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  streams: RecordStream[];
  groups: Group[] = [];

  visualization: Visualization;

  private lastActiveVisualizationIndex: number;
  private lastProject: Project;

  /**
   * Active Project and Visualization subscription
   */
  activeProjectVisualizationSubscription: Subscription;
  /**
   * Advanced service subscription
   */
  advancedServiceSubscription: Subscription;

  constructor(
    store: Store<ApplicationState>,
    mavSelectionStore: Store<MavSelectionState>,
    private updateService: UpdateVisService,
    private advancedService: AdvancedService
  ) {
    this.activeProjectVisualizationSubscription = store.pipe(select(getUiFeature)).subscribe(({ activeVisualization, project }) => {
      this.lastActiveVisualizationIndex = activeVisualization.visualizationIndex;
      this.lastProject = project;
      this.setState(project, activeVisualization.visualizationIndex);
    });
    this.advancedServiceSubscription = mavSelectionStore.pipe(select(getAdvancedEnabledSelector)).subscribe(() => {
      if (this.lastProject) {
        this.setState(this.lastProject, this.lastActiveVisualizationIndex);
      }
    });
  }

  ngOnDestroy(): void {
    this.advancedServiceSubscription.unsubscribe();
    this.activeProjectVisualizationSubscription.unsubscribe();
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
      options
        .map<GraphicSymbolOption>(this.filterGraphicSymbolOptions.bind(this))
        .forEach(option => {
          const symbol = graphicSymbols[option.id];
          const index = symbol ? this.streams.indexOf(symbol.recordStream) : -1;
          if (symbol && this.hasSetGraphicVariables(symbol, option)) {
            this.groups.push({ option, index });
          }
      });
    }
  }

  private filterGraphicSymbolOptions(gsOptions: GraphicSymbolOption): GraphicSymbolOption {
    if (!this.advancedService.advancedEnabled) {
      gsOptions = cloneDeep(gsOptions);
      gsOptions.graphicVariableOptions = gsOptions.graphicVariableOptions.filter((gv) => !gv.advanced);
    }
    return gsOptions;
  }

  private hasSetGraphicVariables(graphicSymbol: GraphicSymbol, gsOptions: GraphicSymbolOption): boolean {
    const goodNames = {};
    gsOptions.graphicVariableOptions.forEach((gv) => {
      goodNames[gv.id] = true;
      goodNames[gv.type] = true;
    });
    return Object.keys(graphicSymbol.graphicVariables).filter(gv => goodNames[gv]).length > 0;
  }
}
