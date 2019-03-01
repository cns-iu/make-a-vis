import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { map as loMap, at as loAt } from 'lodash'

import { DataSource } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ExportTableService {
  save(source: DataSource): void {
    const header = loMap(source.columns, 'label');
    const ids = loMap(source.columns, 'id');
    const values = loMap(source.data, item => loAt(item, ids));
    const csv = unparse({ fields: header, data: values });
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, source.label + '.csv');
  }
}
