import { Injectable } from '@angular/core';

import { access, RawChangeSet, Operator, map, combine } from '@ngx-dino/core';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from '../../shared/store';

import { BehaviorSubject, Observable } from 'rxjs';

import { DataVariable, GraphicVariable, Project, RecordSet } from 'dvl-fw';


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
  maxRecords = 50;

  private dataSourcesChange = new BehaviorSubject<DataSource[]>(undefined);
  dataSourcesChanged: Observable<DataSource[]> = this.dataSourcesChange.asObservable();

  constructor(private store: Store<ApplicationState>) {
    store.pipe(select(getLoadedProject))
      .subscribe((project: Project) => {
        if (project) {
          const recordSets = project.recordSets;

          if (recordSets.length) {
            const dataSources = recordSets.map((recordSet: RecordSet) => {
              const dataSource: DataSource = {} as DataSource;

              dataSource.id = recordSet.id || '';
              dataSource.label = recordSet.label || '';
              dataSource.columns = recordSet.dataVariables;

              const operator = this.getDataMappingOperator(recordSet.dataVariables, project.graphicVariables, recordSet.id);

              recordSet.defaultRecordStream.asObservable().subscribe((changeSet: RawChangeSet<any>) => {
                dataSource.data = (changeSet.insert || []).slice(0, this.maxRecords).map(operator.getter);
                if (changeSet.insert.length > 1) {
                  dataSource.label = recordSet.labelPlural;
                }
              });

              return dataSource;
            });
            this.dataSourcesChange.next(dataSources);
          }
        }
      });
  }

  getDataMappingOperator(dataVariables: DataVariable[], graphicVariables: GraphicVariable[], recordSetId: string): Operator<any, any> {
    const mapping = {};
    dataVariables.forEach((dv: DataVariable) => {
      const filter = graphicVariables.filter((gv: GraphicVariable) => {
        if ((gv.dataVariable.id === dv.id) && (gv.recordSet.id === recordSetId)
          && (gv.type === 'text' || gv.type === 'label') ) {
          return gv;
        }
      });
      if (filter.length) {
        mapping[dv.id] = filter[0].asBoundField().operator;
      } else {
        mapping[dv.id] = access<any>(dv.id, '');
      }
    });

    return combine(mapping);
  }
}
