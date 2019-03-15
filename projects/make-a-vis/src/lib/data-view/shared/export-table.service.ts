import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { at as loAt, map as loMap } from 'lodash';
import { unparse } from 'papaparse';

import { DataSource } from './data.service';

/**
 * Service for saving a table's data to a csv file.
 */
@Injectable({
  providedIn: 'root'
})
export class ExportTableService {
  /**
   * Saves table data to a csv file.
   *
   * @param source The table data.
   */
  save(source: DataSource): void {
    const header = loMap(source.columns, 'label');
    const ids = loMap(source.columns, 'id');
    const values = loMap(source.data, item => loAt(item, ids));
    const csv = unparse({ fields: header, data: values });
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, source.label + '.csv');
  }
}
