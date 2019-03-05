// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import * as payloadTypes from '../../data-view/shared/store/payload-types';
import { getOpenGVGroupPanelsSelector, isGVPanelOpenSelector } from '../../mav-selection/shared/store';
import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { DataService, DataSource } from '../shared/data.service';
import { ExportTableService } from '../shared/export-table.service';


/** Flat node with expandable and level information */
export interface ParentNode {
  label: string;
  description: string;
}

@Component({
  selector: 'mav-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
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
    private actionDispatcherService: ActionDispatcherService,
    private dataService: DataService,
    private exportService: ExportTableService,
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

    combineLatest(
      store.select(getOpenGVGroupPanelsSelector).pipe(
        map(groups => groups.map(({ streamId }) => streamId)),
        map(ids => ids.indexOf(this.dataSource && this.dataSource.streamId) !== -1)
      ),
      store.select(isGVPanelOpenSelector)
    ).pipe(
      map(([b1, b2]) => b1 && b2),
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

  exportTable(source: DataSource): void {
    this.exportService.save(source);
  }
}
