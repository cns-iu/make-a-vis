import { Action } from '@ngrx/store';

import * as payloadTypes from './payload-types';

export enum DataViewActionTypes {
    ShowChildrenTables = '[UI] Show Children Table Of Data Table',
    HideChildrenTables = '[UI] Show Children Table Of Data Table',
    ShowDataRows = '[UI] Show Data Rows',
    HideDataRows = '[UI] Hide Data Rows'
}

export class ShowDataTableChildren implements Action {
    readonly type = DataViewActionTypes.ShowChildrenTables;
    constructor(public payload: payloadTypes.ToggleDataTableChildren) {
    }
}

export class HideDataTableChildren implements Action {
    readonly type = DataViewActionTypes.HideChildrenTables;
    constructor(public payload: payloadTypes.ToggleDataTableChildren) {
    }
}

export class ShowDataRows implements Action {
    readonly type = DataViewActionTypes.ShowDataRows;
    constructor(public payload: payloadTypes.ToggleDataTableRows) {
    }
}

export class HideDataRows implements Action {
    readonly type = DataViewActionTypes.HideDataRows;
    constructor(public payload: payloadTypes.ToggleDataTableRows) {
    }
}

export type DataTableActionsUnion = ShowDataTableChildren | HideDataTableChildren | ShowDataRows | HideDataRows;
