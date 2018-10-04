import { Injectable } from '@angular/core';

import { RawChangeSet } from '@ngx-dino/core';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from '../../shared/store';

import { BehaviorSubject } from 'rxjs';

import { DataVariable, Project, RecordSet } from 'dvl-fw';

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
      .subscribe((data: Project) => {
        if (data) {
          const recordSets = data.recordSets;

          if (recordSets.length) {
            recordSets.forEach((recordSet: RecordSet) => {
              const dataSource: DataSource = {} as DataSource;

              dataSource.id = recordSet.id || '';
              dataSource.label = recordSet.label || '';
              dataSource.columns = recordSet.dataVariables || [];

              recordSet.defaultRecordStream.asObservable().subscribe((changeSet: RawChangeSet<any>) => {
                dataSource.data = changeSet.insert || [];
                if (changeSet.insert.length > 1) {
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
