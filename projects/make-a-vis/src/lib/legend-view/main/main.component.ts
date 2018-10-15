import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, distinctUntilChanged, pluck } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { GraphicSymbolOption, Project } from 'dvl-fw';
import { ApplicationState, getUiFeature } from '../../shared/store';

@Component({
  selector: 'mav-legend-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  recordStreams: any[] = [ // TODO
    {value: 'recordStream1', viewValue: 'Record Stream 1'},
    {value: 'recordStream2', viewValue: 'Record Stream 2'},
    {value: 'recordStream3', viewValue: 'Record Stream 3'}
  ];
  options: GraphicSymbolOption[] = [];
  legendTypes = ['Nodes', 'Edges', 'States'];

  constructor(public store: Store<ApplicationState>) {
    const emptyArray = [];

    store.pipe(
      select(getUiFeature),
      concatMap(({ activeVisualization: index, project}) => {
        const hasVis = project && index >= 0;
        return hasVis ? of(project).pipe(
          pluck<Project, GraphicSymbolOption[]>('visualizations', String(index), 'graphicSymbolOptions')
        ) : of<GraphicSymbolOption[]>(emptyArray);
      }),
      distinctUntilChanged()
    ).subscribe(options => {
      this.options = options;
    });
  }

  ngOnInit() {
  }
}
