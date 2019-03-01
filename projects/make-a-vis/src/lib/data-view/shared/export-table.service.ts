import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

import { DataSource } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ExportTableService {
  save(source: DataSource): void {
    const csv = unparse(source.data);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, source.label + '.csv');
  }
}
