// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService, DataSource } from '../shared/data.service';

@Component({
  selector: 'mav-data-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Output() toggleAddVis = new EventEmitter<boolean>();
  dataSources: Observable<DataSource[]>;
  addVizSidenavState = false;

  constructor(private dataService: DataService) {
    this.dataSources = dataService.dataSourcesChanged;
  }

  ngOnInit() {
  }

  toggleAddVisualization() {
    this.addVizSidenavState = !this.addVizSidenavState;
    this.toggleAddVis.emit(this.addVizSidenavState);
  }
}
