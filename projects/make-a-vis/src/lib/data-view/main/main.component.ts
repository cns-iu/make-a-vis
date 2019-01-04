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
  dataSources: Observable<DataSource[]>;
  showDataViewMessage = true;

  constructor(private dataService: DataService) {
    this.dataSources = dataService.dataSourcesChanged;
    this.dataSources.subscribe((d) => {
      if (d.length > 0) {
        this.showDataViewMessage = false;
      } else {
        this.showDataViewMessage = true;
      }
    });
  }

  ngOnInit() {
  }

  getPadding(level) {
    return 2 * level;
  }
}
