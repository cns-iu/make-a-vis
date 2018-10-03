import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from '../../shared/store';

import { BehaviorSubject, from } from 'rxjs';

import { DataVariable } from 'dvl-fw';

export interface DataSource {
  id: string;
  label: string;
  columns: DataVariable[];
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSourceSubject = new BehaviorSubject<DataSource>(undefined);

  constructor(private store: Store<ApplicationState>) {
    store.pipe(select(getLoadedProject))
      .subscribe((data: any) => {
        if (data && data.project) {
          const recordSets = data.project.recordSets;

          if (recordSets.length) {
            recordSets.forEach((recordSet) => {
              const dataSource: DataSource = {} as DataSource;

              dataSource.id = recordSet.id ? recordSet.id : '';
              dataSource.label = recordSet.label ? recordSet.label : '';
              dataSource.columns = recordSet.dataVariables.length ? recordSet.dataVariables : [];

              from(recordSet.defaultRecordStream.getData()).subscribe((records: any) => {
                dataSource.data = records.length ? records : [];
                if (records.length > 1) {
                  dataSource.label = recordSet.labelPlural;
                }
                this.dataSourceSubject.next(dataSource);
              });
            });
          }
        }
      });
  }
}
