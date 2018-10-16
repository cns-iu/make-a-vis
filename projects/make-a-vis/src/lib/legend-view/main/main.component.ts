import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GraphicSymbolOption, Project, RecordStream, Visualization } from 'dvl-fw';
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

  constructor(private store: Store<ApplicationState>) {
    store.pipe(select(getUiFeature)).subscribe(({ activeVisualization, project }) => {
      this.setState(project, activeVisualization);
    });
  }

  onStreamChange(group: Group, index: number) {
    // TODO
  }

  private setState(project: Project, index: number): void {
    const visualization = project && index >= 0 && project.visualizations[index];
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
        this.groups.push({ option, index });
      });
    }
  }
}
