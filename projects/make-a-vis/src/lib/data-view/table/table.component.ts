import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataVariable } from 'dvl-fw';

@Component({
  selector: 'mav-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() dataSource: any;
  @Input() displayedColumns: DataVariable[] = [];
  displayedColumnNames: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if ('displayedColumns' in changes) {
      this.displayedColumnNames = this.displayedColumns.map((ds) => ds.label);
    }
  }
}
