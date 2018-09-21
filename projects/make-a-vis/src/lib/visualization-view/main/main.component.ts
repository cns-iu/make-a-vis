import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../shared/store/state';
import { VisualizationState } from '../shared/store/state';
import { VisualizationActionTypes } from '../shared/store/actions';

@Component({
  selector: 'mav-visualization-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  checkVisualizationState: Observable<VisualizationState>;

  tabs = [];
  menuOptions = [
    { label: 'Scatter Graph', icon: 'scatterGraph' },
    { label: 'Geomap', icon: 'geomap' },
    { label: 'Map of Science', icon: 'mapOfScience' },
    { label: 'Network', icon: 'network' },
    { label: 'Horizontal Bar Graph', icon: 'hbg' }
  ];
  selectedTab = 0;

  constructor(private store: Store<ApplicationState>) {
    this.checkVisualizationState = store.pipe(select('visualization'));
    this.checkVisualizationState.subscribe((k) => {
      console.log('viz. state output --- ', k); // for example
    });
   }

  ngOnInit() {
  }

  selected(target: number) {
    this.selectedTab = target;
  }

  addTab(label: string) {
    this.tabs.push(label);
    this.store.dispatch({ type: VisualizationActionTypes.NewVisualization }); // for example
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
