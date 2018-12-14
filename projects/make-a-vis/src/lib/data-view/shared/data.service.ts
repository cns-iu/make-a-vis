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
  children: DataSource[];
  childrenHidden: boolean;
  columns: DataVariable[];
  data: any[];
  level: number;
  hidden: boolean;
  hiddenData: boolean;
  numRows: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  maxRecords = 50;

  private dataSourcesChange = new BehaviorSubject<DataSource[]>(undefined);
  dataSourcesChanged: Observable<DataSource[]> = this.dataSourcesChange.asObservable();
  dataSources: DataSource[];

  constructor(private store: Store<ApplicationState>) {
    store.pipe(select(getLoadedProject))
      .subscribe((project: Project) => {
        if (project && project.recordSets) {
          this.dataSources = project.recordSets.map((recordSet: RecordSet) => {
            const dataSource: DataSource = {} as DataSource;

            dataSource.id = recordSet.id || '';
            dataSource.label = recordSet.label || '';
            dataSource.description = recordSet.description || undefined;
            dataSource.columns = recordSet.dataVariables;
            dataSource.parent = recordSet.parent;
            dataSource.hidden = false;
            dataSource.level = 0;
            dataSource.childrenHidden = false;
            dataSource.hiddenData = false;
            dataSource.numRows = 0;
            const operator = this.getDataMappingOperator(recordSet.dataVariables, project.graphicVariables, recordSet.id);
            recordSet.defaultRecordStream.asObservable().subscribe((changeSet: RawChangeSet<any>) => {
              dataSource.data = (changeSet.insert || []).slice(0, this.maxRecords).map(operator.getter);
              dataSource.numRows += (changeSet.insert.length || 0) - (changeSet.remove.length || 0);
              if (changeSet.insert.length > 1) {
                dataSource.label = recordSet.labelPlural;
              }
            });
            return dataSource;
          });
          this.dataSources = this.getFlatArrayOfDataSources(this.getDataSourceWithChildren(this.dataSources, 0));
          console.log(this.dataSources);
          this.dataSourcesChange.next(this.dataSources);
        } else {
          this.dataSourcesChange.next([]);
        }
      });
  }

  getFlatArrayOfDataSources(dataSources: DataSource[]): DataSource[] {
    const stack = dataSources;
    const flastDataSources: DataSource[] = [];
    while (stack && stack.length > 0) {
      const dataSource = stack.shift();
      flastDataSources.push(dataSource);
      const children = dataSource.children;
      [].unshift.apply(stack , children);
    }
    return flastDataSources;
  }

  getChildrenForRecord(dataSources: DataSource[], id: string, level: number): DataSource[] {
    const childrenList = [];
    dataSources.forEach(element => {
      if (element.parent && element.parent.id === id) {
        element.level = level + 1;
        element.children = this.getChildrenForRecord(dataSources, element.id, level + 1);
        childrenList.push(element);
      }
    });
    return childrenList;
  }

  getDataSourceWithChildren(dataSources: DataSource[], level: number): DataSource[] {
    const dataSourceWithChildren: DataSource[] = [];
    for (const dataSource of dataSources) {
      if ( dataSource.parent === undefined) {
        dataSource.children = this.getChildrenForRecord(dataSources, dataSource.id, level);
        dataSourceWithChildren.push(dataSource);
      }
    }
    return dataSourceWithChildren;
  }

  toggleChildren(children: DataSource[]) {
    for (const child of children) {
      child.hidden = !child.hidden;
      this.toggleChildren(child.children);
    }
  }

  toggleDataTable(dataSource: DataSource) {
    dataSource.childrenHidden = !dataSource.childrenHidden;
    this.toggleChildren(dataSource.children);
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
