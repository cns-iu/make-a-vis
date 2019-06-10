// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { DataVariable, GraphicVariable, Project, RecordSet } from '@dvl-fw/core';
import { select, Store } from '@ngrx/store';
import { access, chain, combine, idSymbol, Operator, RawChangeSet, map as dinoMap } from '@ngx-dino/core';
import { get } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationState, getLoadedProject } from '../../shared/store';

/**
 * Data source interface
 */
export interface DataSource {
  id: string;
  label: string;
  description?: string;
  parent: RecordSet;
  children: DataSource[];
  childrenHidden: boolean;
  columns: DataVariable[];
  data: Observable<any[]>;
  operator: Operator<any, any>;
  level: number;
  hidden: boolean;
  hiddenData: boolean;
  numRows: number;
  streamId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * Behavior subject to emit an updated data source
   */
  private dataSourcesChange = new BehaviorSubject<DataSource[]>(undefined);
  /**
   * Allowed label size in the table cells (after which the label is truncated and an ellipsis is added)
   */
  maxCellStringLength = 64;
  /**
   * Observable from the dataSourcesChange BehaviorSubject to emit an updated data-source
   */
  dataSourcesChanged: Observable<DataSource[]> = this.dataSourcesChange.asObservable();
  /**
   * Data sources array to hold all data sources
   */
  dataSources: DataSource[];


  /**
   * Creates an instance of data service.
   * @param store instance of Store which provides access to the ApplicationState
   */
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
            dataSource.streamId = get(recordSet.defaultRecordStream, 'id');
            dataSource.operator = this.getDataMappingOperator(recordSet.dataVariables, project.graphicVariables, recordSet.id);

            if (recordSet.defaultRecordStream) {
              let data: any[] = [];
              dataSource.data = recordSet.defaultRecordStream.asObservable().pipe(
                map((changeSet: RawChangeSet<any>) => {
                  data = this.updateData(data, dataSource, changeSet);
                  dataSource.numRows = data.length;
                  if (data.length > 1) {
                    dataSource.label = recordSet.labelPlural;
                  }
                  return data;
                })
              );
            }

            return dataSource;
          });

          this.dataSources = this.getFlatArrayOfDataSources(this.getDataSourceWithChildren(this.dataSources, 0));
          this.dataSourcesChange.next(this.dataSources);
        } else {
          this.dataSourcesChange.next([]);
        }
      });
  }

  private updateData(data: any[], dataSource: DataSource, changeSet: RawChangeSet<any>): any[] {
    if (changeSet.remove.length) {
      const filtered = data.filter(e => {
        return !changeSet.remove.some(obj => obj[idSymbol] === e.id);
      });
      data = filtered.concat(changeSet.insert);
    } else if (changeSet.insert.length) {
      data = data.concat(changeSet.insert);
    }

    if (changeSet.update.length) {
      changeSet.update.forEach(el => {
        const index = data.findIndex(e => e.id === el[idSymbol]);
        data[index] = Object.assign(data[index] || {}, el[idSymbol]);
      });
    }

    if (changeSet.replace.length) {
      changeSet.replace.forEach(el => {
        const index = data.findIndex(e => e.id === el[1].id);
        data[index] = el;
      });
    }

    return data;
  }

  /**
   * Gets a flat array of data sources
   * @param dataSources array of data-sources
   * @returns flat array of data sources
   */
  getFlatArrayOfDataSources(dataSources: DataSource[]): DataSource[] {
    const stack = dataSources;
    const flastDataSources: DataSource[] = [];
    while (stack && stack.length > 0) {
      const dataSource = stack.shift();
      flastDataSources.push(dataSource);
      const children = dataSource.children;
      [].unshift.apply(stack, children);
    }
    return flastDataSources;
  }

  /**
   * Constructs a hierarchy of data-sources
   * @param dataSources array of data-sources
   * @param id id of data-source
   * @param level level of hierarchy
   * @returns an array of data-sources with hierarchical information
   */
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

  /**
   * Gets data sources with info on their children
   * @param dataSources array of data-sources
   * @param level level of hierarchy in the hierarchy of data-sources
   * @returns array of data-sources with their children information
   */
  getDataSourceWithChildren(dataSources: DataSource[], level: number): DataSource[] {
    const dataSourceWithChildren: DataSource[] = [];
    for (const dataSource of dataSources) {
      if (dataSource.parent === undefined) {
        dataSource.children = this.getChildrenForRecord(dataSources, dataSource.id, level);
        dataSourceWithChildren.push(dataSource);
      }
    }
    return dataSourceWithChildren;
  }

  /**
   * Toggles the children of a data source
   * @param children array of children data-sources
   */
  toggleChildren(children: DataSource[]) {
    for (const child of children) {
      child.hidden = !child.hidden;
      this.toggleChildren(child.children);
    }
  }

  /**
   * Toggles the data table
   * @param dataSource the data-source associated with the data-table
   */
  toggleDataTable(dataSource: DataSource) {
    dataSource.childrenHidden = !dataSource.childrenHidden;
    this.toggleChildren(dataSource.children);
  }


  /**
   * Function that adds display variables to be used in the table.
   * This includes the value to display in the cell and the value to
   * display in the tooltip (if any).
   * @param item the source data to display in the table
   * @returns a new item with additional display variables
   */
  private injectDisplayVariables(item: any): any {
    item = Object.assign({}, item);
    Object.keys(item).forEach((key: string) => {
      const value = '' + item[key];
      const isLongString = value.length > this.maxCellStringLength;
      item[key + '__display_value__'] = isLongString ?
        value.trim().slice(0, this.maxCellStringLength + 1) + '...' :
        value;
      item[key + '__tooltip_value__'] = isLongString ? value : '';
    });
    return item;
  }

  /**
   * Gets data mapping operator
   * @param dataVariables array of data-variables
   * @param graphicVariables array of graphic-variables
   * @param recordSetId record-set-id associated with
   * @returns data variable to graphic variable mapping operator
   */
  getDataMappingOperator(dataVariables: DataVariable[], graphicVariables: GraphicVariable[], recordSetId: string): Operator<any, any> {
    const mapping = {};
    dataVariables.forEach((dv: DataVariable) => {
      const filter = graphicVariables.filter((gv: GraphicVariable) => {
        if ((gv.dataVariable.id === dv.id) && (gv.recordSet.id === recordSetId)
          && (gv.type === 'text' || gv.type === 'label')) {
          return gv;
        }
      });
      if (filter.length) {
        mapping[dv.id] = filter[0].asBoundField().operator;
      } else {
        mapping[dv.id] = access<any>(dv.id, '');
      }
    });

    return chain(combine(mapping), dinoMap(this.injectDisplayVariables.bind(this)));
  }
}
