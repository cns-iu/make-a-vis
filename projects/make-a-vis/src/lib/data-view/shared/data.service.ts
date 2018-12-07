// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { access, combine, Operator, RawChangeSet} from '@ngx-dino/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataVariable, GraphicVariable, Project, RecordSet } from '@dvl-fw/core';
import { ApplicationState, getLoadedProject } from '../../shared/store';

export interface DataSource {
  id: string;
  label: string;
  description?: string;
  parent: RecordSet;
  childrens: RecordSet[];
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
        if (project && project.recordSets) {
          const dataSources = project.recordSets.map((recordSet: RecordSet) => {
            const dataSource: DataSource = {} as DataSource;

            dataSource.id = recordSet.id || '';
            dataSource.label = recordSet.label || '';
            dataSource.description = recordSet.description || undefined;
            dataSource.columns = recordSet.dataVariables;
            dataSource.parent = recordSet.parent;

            const operator = this.getDataMappingOperator(recordSet.dataVariables, project.graphicVariables, recordSet.id);

            recordSet.defaultRecordStream.asObservable().subscribe((changeSet: RawChangeSet<any>) => {
              dataSource.data = (changeSet.insert || []).slice(0, this.maxRecords).map(operator.getter);
              if (changeSet.insert.length > 1) {
                dataSource.label = recordSet.labelPlural;
              }
            });
            return dataSource;
          });
          console.log(dataSources);
          this.dataSourcesChange.next(dataSources);
        } else {
          this.dataSourcesChange.next([]);
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
