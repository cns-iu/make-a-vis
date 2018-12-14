// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DataVariable } from '@dvl-fw/core';

import { DataSource, DataService } from '../shared/data.service';


/** Flat node with expandable and level information */
export interface ParentNode {
  label: string;
  description: string;
}

@Component({
  selector: 'mav-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnChanges, OnInit {
  @Input() dataSource: DataSource;
  @Input() displayedColumns: DataVariable[] = [];
  displayedColumnNames: string[] = [];
  constructor(private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('displayedColumns' in changes) {
      this.displayedColumnNames = this.displayedColumns.map((ds) => ds.label);
    }
  }

  ngOnInit() {
  }

  toggleDataTable(dataSource: DataSource) {
    this.dataService.toggleDataTable(dataSource);
  }

  toggleRows(dataSource: DataSource) {
    dataSource.hiddenData = !dataSource.hiddenData;
  }
}
