import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { every as loEvery, forEach as loForEach, get as loGet, includes as loIncludes, map as loMap } from 'lodash';
import { combineLatest as rxCombineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged as rxDistinctUntilChanged, map as rxMap } from 'rxjs/operators';

import { getOpenGVGroupPanelsSelector, isGVPanelOpenSelector } from '../../mav-selection/shared/store';
import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { DataService, DataSource } from '../shared/data.service';
import { ExportTableService } from '../shared/export-table.service';
import { logging } from 'protractor';

/**
 * A component for displaying a paginated, collapsible table with a label, description, and zero or more sub-tables.
 */
@Component({
  selector: 'mav-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * Table data.
   */
  @Input() dataSource: DataSource;

  /**
   * Columns to display.
   */
  @Input() displayedColumns: DataVariable[] = [];

  /**
   * Vertical index of the table starting from the top.
   */
  @Input() tableIndex: number;

  /**
   * Size of cell value (after which cell value will be truncated and replaced with an ellipsis)
   */
  @Input() cellValueSize = 64;

  /**
   * Reference to the paginator element.
   */
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Number of rows per table page.
   */
  readonly pageSize = 3;

  /**
   * Gets column names as strings.
   */
  get columnNames(): string[] { return loMap(this.displayedColumns, 'label'); }

  /**
   * Gets the rows of data.
   */
  get data(): any[] { return loGet(this.tableDataSource, 'data', []); }

  /**
   * Gets the Obvervable that returns rows of data.
   */
  get data$(): Observable<any[]> { return loGet(this.dataSource, 'data', of([])); }

  /**
   * Gets the table's description.
   */
  get description(): string { return loGet(this.dataSource, 'description', ''); }

  /**
   * Gets the table's label.
   */
  get label(): string { return loGet(this.dataSource, 'label', ''); }

  /**
   * Gets number of rows of data.
   */
  get numberOfRows(): number { return loGet(this.tableDataSource, ['data', 'length'], 0); }

  /**
   * Whether hovering over a table header has any effect.
   */
  hoverEnabled = false;

  /**
   * Data source for the table with pagination.
   */
  tableDataSource = new MatTableDataSource<any>();

  /**
   * Contains all columns that can be hovered over.
   */
  private hoverableColumnIds: string[] = undefined;

  /**
   * The record set that can be hovered over.
   */
  private hoverableRecordSetId: string = undefined;

  /**
   * Data subscription
   */
  private dataSubscription: Subscription;

  /**
   * Pagination subscription
   */
  private paginatorSubscription: Subscription;

  /**
   * An array of all subscriptions that needs to be cleaned up during destroy.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Creates an instance of table component.
   *
   * @param store The ngrx store.
   * @param actionDispatcherService The service for emitting toggle events.
   * @param dataService The service for emitting data changes.
   * @param exportService The service used to save data as csv.
   * @param hoverService The service for emitting hover events.
   */
  constructor(
    store: Store<any>,
    private actionDispatcherService: ActionDispatcherService,
    private dataService: DataService,
    private exportService: ExportTableService,
    private hoverService: DataVariableHoverService
  ) {
    this.subscriptions.push(this.subscribeToHoverEvents());
    this.subscriptions.push(this.subscribeToHoverEnabled(store));
  }

  /**
   * Angular's AfterViewInit lifecycle hook.
   */
  ngAfterViewInit() {
    this.updateData();
  }

  /**
   * Angular's OnChanges lifecycle hook.
   * Detects updates to `dataSource`.
   *
   * @param changes The changed values.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('dataSource' in changes || 'paginator' in changes) {
      this.updateData();
    }
  }

  /**
   * Angular's OnDestroy lifecycle hook.
   * Cleans up all subscriptions.
   */
  ngOnDestroy() {
    loForEach(this.subscriptions, sub => sub.unsubscribe());
    this.subscriptions = [];

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.paginatorSubscription) {
      this.paginatorSubscription.unsubscribe();
    }
  }

  /**
  * Updates data
  */
  updateData(): void {
    this.dataSubscription = this.data$.subscribe((data) => {
      this.tableDataSource.data = data;
      if (this.paginator && this.tableDataSource.paginator !== this.paginator) {
        this.paginatorSubscription = this.paginator.initialized.subscribe(_ => {
          this.tableDataSource.paginator = this.paginator;
        });
      }
    });
  }

  /**
   * Determines whether the table is hidden.
   *
   * @returns True if the table should be hidden, else false.
   */
  isHidden(): boolean { return loGet(this.dataSource, 'hidden', true); }

  /**
   * Determines whether the table is the top level in a hierarchy.
   *
   * @returns True if the table is not a child of another table, else false.
   */
  isFirst(): boolean { return this.tableIndex === 0; }

  /**
   * Determines whether all sub-tables are hidden.
   *
   * @returns True if all sub-table should be hidden, else false.
   */
  isChildrenHidden(): boolean { return loGet(this.dataSource, 'childrenHidden', true); }

  /**
   * Determines whether the table has any data rows.
   *
   * @returns True if there exists at least one row of data, else false.
   */
  hasData(): boolean { return loGet(this.tableDataSource, ['data', 'length'], 0) !== 0; }

  /**
   * Determines whether the table rows are hidden.
   *
   * @returns True if the table rows should be hidden, else false.
   */
  hasHiddenData(): boolean { return loGet(this.dataSource, 'hiddenData', false); }

  /**
   * Determines whether the table has any sub-tables.
   *
   * @returns True if there exists at least one sub-table, else false.
   */
  hasChildren(): boolean { return loGet(this.dataSource, ['children', 'length'], 0) !== 0; }

  /**
   * Gets the material expand more/less arrow icon string specifier/name.
   *
   * @param more Which of the two icons to get.
   * @returns The string corresponding to the icon.
   */
  getToggleIcon(more: boolean): string { return more ? 'expand_more' : 'expand_less'; }

  /**
   * Toggles visibility of sub-tables on/off.
   */
  toggleChildTables(): void {
    const { actionDispatcherService, dataService, dataSource } = this;
    dataService.toggleDataTable(dataSource);
    actionDispatcherService.toggleDataTableChildren({
      dataSourceId: loGet(dataSource, 'id'),
      hiddenChildren: !this.isChildrenHidden()
    });
  }

  /**
   * Toggles visibility of table rows on/off.
   */
  toggleRows(): void {
    const { actionDispatcherService, dataSource } = this;
    if (dataSource) { dataSource.hiddenData = !dataSource.hiddenData; }
    actionDispatcherService.toggleDataTableRows({
      dataSourceId: loGet(dataSource, 'id'),
      hiddenRows: this.hasHiddenData()
    });
  }

  /**
   * Determine if a specific column can be highlighted.
   *
   * @param column The column to check.
   * @returns True if the column allows highlighting, else false.
   */
  shouldHighlight({ id, recordSet: { id: rsId } }: DataVariable): boolean {
    const { hoverableColumnIds, hoverableRecordSetId } = this;
    return loIncludes(hoverableColumnIds, id) && rsId === hoverableRecordSetId;
  }

  /**
   * Emits a start hover event for a column.
   *
   * @param column The column that is being hovered over.
   */
  startHover({ id, recordSet: { id: rsId } }: DataVariable): void {
    this.hoverService.startHover(['table', id, rsId]);
  }

  /**
   * Emits an end hover event for a column.
   *
   * @param column The column that is no longer being hovered over.
   */
  endHover(_data: DataVariable): void { this.hoverService.endHover(); }

  /**
   * Saves a table to a csv file.
   *
   * @param source The data to save.
   */
  exportTable(source: DataSource): void { this.exportService.save(source); }

  /**
   * Subscribes to hover events.
   *
   * @returns The new subscription.
   */
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

  /**
   * Subscribes to hover enabled events.
   *
   * @param store The ngrx store.
   * @returns The new subscription.
   */
  private subscribeToHoverEnabled(store: Store<any>): Subscription {
    const isGVPanelOpen = store.select(isGVPanelOpenSelector);
    const hasGVSubpanelWithIds = store.select(getOpenGVGroupPanelsSelector).pipe(
      rxMap(groups => loMap(groups, 'streamId')),
      rxMap(ids => loIncludes(ids, loGet(this.dataSource, 'streamId')))
    );

    return rxCombineLatest([isGVPanelOpen, hasGVSubpanelWithIds]).pipe(
      rxMap(conditions => loEvery(conditions)),
      rxDistinctUntilChanged()
    ).subscribe(hoverEnabled => setTimeout(() => this.hoverEnabled = hoverEnabled, 0));
  }
}
