// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DataVariable } from '@dvl-fw/core';

import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataSource, DataService } from '../shared/data.service';
import * as payloadTypes from '../../data-view/shared/store/payload-types';


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
  @Input() tableIndex: number;
  displayedColumnNames: string[] = [];
  constructor(private dataService: DataService, private actionDispatcherService: ActionDispatcherService) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('displayedColumns' in changes) {
      this.displayedColumnNames = this.displayedColumns.map((ds) => ds.label);
    }
  }

  ngOnInit() {
  }

  toggleDataTable(dataSource: DataSource) {
    const payload: payloadTypes.ToggleDataTableChildren = {
      hiddenChildren : !dataSource.childrenHidden,
      dataSourceId: dataSource.id
    };
    this.actionDispatcherService.toggleDataTableChildren(payload);
    this.dataService.toggleDataTable(dataSource);
  }

  toggleRows(dataSource: DataSource) {
    const payload: payloadTypes.ToggleDataTableRows = {
      hiddenRows : !dataSource.hiddenData,
      dataSourceId: dataSource.id
    };
    this.actionDispatcherService.toggleDataTableRows(payload);
    dataSource.hiddenData = !dataSource.hiddenData;
  }
}
