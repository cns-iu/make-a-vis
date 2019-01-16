// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, map } from 'rxjs/operators';

import * as payloadTypes from '../../data-view/shared/store/payload-types';
import { isGVPanelOpenSelector, getOpenGVGroupPanelsSelector } from '../../mav-selection/shared/store';
import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataSource, DataService } from '../shared/data.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';


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
export class TableComponent implements OnChanges {
  @Input() dataSource: DataSource;
  @Input() displayedColumns: DataVariable[] = [];
  @Input() tableIndex: number;
  displayedColumnNames: string[] = [];
  hoverRecordSetId: string;
  hoverIds: string[] = [];
  isHoverable = false;

  constructor(
    store: Store<any>,
    private dataService: DataService,
    private actionDispatcherService: ActionDispatcherService,
    private hoverService: DataVariableHoverService
  ) {
    hoverService.hovers.subscribe(event => {
      if (event.length === 0) {
        this.hoverIds = [];
      } else if (event.length >= 3 && event[0] === 'selector') {
        this.hoverRecordSetId = event[1];
        this.hoverIds = event.slice(2);
      }
    });

    store.select(getOpenGVGroupPanelsSelector).pipe(
      map(groups => groups.map(({ streamId }) => streamId)),
      map(ids => ids.indexOf(this.dataSource && this.dataSource.streamId) !== -1),
      combineLatest(store.select(isGVPanelOpenSelector)),
      map(values => values.every(v => v)),
      distinctUntilChanged()
    ).subscribe(hoverable => setTimeout(() => this.isHoverable = hoverable, 0));
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('displayedColumns' in changes) {
      this.displayedColumnNames = this.displayedColumns.map((ds) => ds.label);
    }
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

  shouldHighlight(column: DataVariable): boolean {
    return this.hoverIds.indexOf(column.id) !== -1 && column.recordSet.id === this.hoverRecordSetId;
  }

  startHover(data: DataVariable): void {
    this.hoverService.startHover(['table', data.id, data.recordSet.id]);
  }

  endHover(_data: DataVariable): void {
    this.hoverService.endHover();
  }
}
