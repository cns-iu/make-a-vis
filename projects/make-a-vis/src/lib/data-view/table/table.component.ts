import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { every as loEvery, forEach as loForEach, get as loGet, includes as loIncludes, map as loMap } from 'lodash';
import { combineLatest as rxCombineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged as rxDistinctUntilChanged, map as rxMap } from 'rxjs/operators';

import { getOpenGVGroupPanelsSelector, isGVPanelOpenSelector } from '../../mav-selection/shared/store';
import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { DataService, DataSource } from '../shared/data.service';
import { ExportTableService } from '../shared/export-table.service';

@Component({
  selector: 'mav-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() dataSource: DataSource;
  @Input() displayedColumns: DataVariable[] = [];
  @Input() tableIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly pageSize = 3;

  get columnNames(): string[] { return loMap(this.displayedColumns, 'label'); }
  get data(): any[] { return loGet(this.dataSource, 'data', []); }
  get description(): string { return loGet(this.dataSource, 'description', ''); }
  get label(): string { return loGet(this.dataSource, 'label', ''); }
  get numberOfRows(): number { return loGet(this.dataSource, ['data', 'length'], 0); }

  hoverEnabled = false;
  tableDataSource = new MatTableDataSource<any>();

  private hoverableColumnIds: string[] = undefined;
  private hoverableRecordSetId: string = undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    store: Store<any>,
    private actionDispatcherService: ActionDispatcherService,
    private dataService: DataService,
    private exportService: ExportTableService,
    private hoverService: DataVariableHoverService,
  ) {
    this.subscriptions.push(this.subscribeToHoverEvents());
    this.subscriptions.push(this.subscribeToHoverEnabled(store));
  }

  ngAfterViewInit() {
    const { data, paginator, tableDataSource } = this;
    tableDataSource.data = data;
    tableDataSource.paginator = paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, tableDataSource } = this;
    if ('dataSource' in changes) { tableDataSource.data = data; }
  }

  ngOnDestroy() {
    loForEach(this.subscriptions, sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  isHidden(): boolean { return loGet(this.dataSource, 'hidden', true); }
  isFirst(): boolean { return this.tableIndex === 0; }
  isChildrenHidden(): boolean { return loGet(this.dataSource, 'childrenHidden', true); }
  hasData(): boolean { return loGet(this.dataSource, ['data', 'length'], 0) !== 0; }
  hasHiddenData(): boolean { return loGet(this.dataSource, 'hiddenData', false); }
  hasChildren(): boolean { return loGet(this.dataSource, ['children', 'length'], 0) !== 0; }

  getToggleIcon(more: boolean): string { return more ? 'expand_more' : 'expand_less'; }

  toggleChildTables(): void {
    const { actionDispatcherService, dataService, dataSource } = this;
    dataService.toggleDataTable(dataSource);
    actionDispatcherService.toggleDataTableChildren({
      dataSourceId: loGet(dataSource, 'id'),
      hiddenChildren: !this.isChildrenHidden()
    });
  }

  toggleRows(): void {
    const { actionDispatcherService, dataSource } = this;
    if (dataSource) { dataSource.hiddenData = !dataSource.hiddenData; }
    actionDispatcherService.toggleDataTableRows({
      dataSourceId: loGet(dataSource, 'id'),
      hiddenRows: this.hasHiddenData()
    });
  }

  shouldHighlight({ id, recordSet: { id: rsId } }: DataVariable): boolean {
    const { hoverableColumnIds, hoverableRecordSetId } = this;
    return loIncludes(hoverableColumnIds, id) && rsId === hoverableRecordSetId;
  }

  startHover({ id, recordSet: { id: rsId } }: DataVariable): void {
    this.hoverService.startHover(['table', id, rsId]);
  }
  endHover(_data: DataVariable): void { this.hoverService.endHover(); }
  exportTable(source: DataSource): void { this.exportService.save(source); }

  private subscribeToHoverEvents(): Subscription {
    return this.hoverService.hovers.subscribe(event => {
      const length = event.length;
      const [type, rsId, ...ids] = event;

      if (length === 0) {
        this.hoverableRecordSetId = undefined;
        this.hoverableColumnIds = undefined;
      } else if (length >= 3 && type === 'selector') {
        this.hoverableRecordSetId = rsId;
        this.hoverableColumnIds = ids;
      }
    });
  }

  private subscribeToHoverEnabled(store: Store<any>): Subscription {
    const isGVPanelOpen = store.select(isGVPanelOpenSelector);
    const hasGVSubpanelWithIds = store.select(getOpenGVGroupPanelsSelector).pipe(
      rxMap(groups => loMap(groups, 'streamId')),
      rxMap(ids => loIncludes(ids, loGet(this.dataSource, 'streamId')))
    );

    return rxCombineLatest(isGVPanelOpen, hasGVSubpanelWithIds).pipe(
      rxMap(conditions => loEvery(conditions)),
      rxDistinctUntilChanged()
    ).subscribe(hoverEnabled => setTimeout(() => this.hoverEnabled = hoverEnabled, 0));
  }
}
