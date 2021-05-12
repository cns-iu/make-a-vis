import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { assign } from 'lodash';

import { DataTableActionsUnion, DataViewActionTypes } from './actions';
import { DataTableState, INITIAL_DATATABLE_STATE } from './state';

export function dataTableStateReducer(state: DataTableState, action: DataTableActionsUnion) {
    state = state || INITIAL_DATATABLE_STATE;
    const newState: DataTableState = assign({}, state);

    switch (action.type) {
        case DataViewActionTypes.ShowChildrenTables:
        case DataViewActionTypes.HideChildrenTables:
            newState.showingDataTableChildren = action.payload;
            return newState;

        case DataViewActionTypes.ShowDataRows:
        case DataViewActionTypes.HideDataRows:
            newState.showingDataTableRows = action.payload;
            return newState;

        default:
            return state;
    }
}

export const selectSelfFeature: MemoizedSelector<object, DataTableState> = createFeatureSelector<DataTableState>('dataView');

export const getDataTableShowChildren = (state: DataTableState): boolean => state.showingDataTableChildren.hiddenChildren;
export const getDataTableShowChildrenSelector = createSelector<DataTableState, DataTableState, boolean>(
  selectSelfFeature,
  getDataTableShowChildren
);

export const getDataTableShowRows = (state: DataTableState): boolean => state.showingDataTableRows.hiddenRows;
export const getDataTableShowRowsSelector = createSelector<DataTableState, DataTableState, boolean>(
  selectSelfFeature,
  getDataTableShowRows
);
