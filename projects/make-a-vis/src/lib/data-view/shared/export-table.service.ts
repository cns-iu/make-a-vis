import { Injectable, OnDestroy } from '@angular/core';
import { saveAs } from 'file-saver';
import { at as loAt, map as loMap } from 'lodash';
import { unparse } from 'papaparse';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataSource } from './data.service';

/**
 * Service for saving a table's data to a csv file.
 */
@Injectable({
  providedIn: 'root'
})
export class ExportTableService implements OnDestroy {
  /**
   * Data subscription of export table service
   */
  private dataSubscription: Subscription;

  /**
   * Saves table data to a csv file.
   *
   * @param source The table data.
   */
   save(source: DataSource): void {
    this.dataSubscription = source.data.pipe(take(1)).subscribe((data) => {
      // Render data as if it were in a table
      data = data.map(source.operator.getter);

      const header = loMap(source.columns, 'label');
      const ids = loMap(source.columns, 'id');
      const values = loMap(data, item => loAt(item, ids));
      const csv = unparse({ fields: header, data: values });
      const blob = new Blob([csv], { type: 'text/csv' });
      saveAs(blob, source.label + '.csv');
    });
  }

  /**
   * on destroy life cycle hook
   */
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
