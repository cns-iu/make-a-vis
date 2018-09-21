import { Action } from '@ngrx/store';

// import { DataSource, Visualization, RecordStream } from 'dvl-fw';

export enum VisualizationActionTypes {
  NewVisualization = '[Visualization] New Visualization',
  NewDatasource = '[Visualization] New Datasource',
  NewRecordStream = '[Visualization] New Record Stream'
}

export class NewVisualizationAction implements Action {
  readonly type = VisualizationActionTypes.NewVisualization;
  constructor(/*public payload?: Visualization*/) {
  }
}

export class NewDatasourceAction implements Action {
  readonly type = VisualizationActionTypes.NewDatasource;
  constructor(/*public payload?: DataSource*/) {
  }
}

export class NewRecordStreamAction implements Action {
  readonly type = VisualizationActionTypes.NewRecordStream;
  constructor(/*public payload?: RecordStream*/) {
  }
}


