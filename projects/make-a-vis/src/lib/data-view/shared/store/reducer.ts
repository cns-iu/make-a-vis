import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { assign, pick } from 'lodash';

import { INITIAL_DATATABLE_STATE, DataTableState } from './state';
import { DataViewActionTypes, DataTableActionsUnion } from './actions';

export function dataTableStateReducer (state: DataTableState = INITIAL_DATATABLE_STATE, action: DataTableActionsUnion) {
    const newState: DataTableState = assign({}, state);

    switch (action.type) {
        case DataViewActionTypes.ShowChildrenTables:
            newState.showingDataTableChildren = action.payload;
            return newState;

        case DataViewActionTypes.HideChildrenTables:
            newState.showingDataTableChildren = action.payload;
            return newState;

        case DataViewActionTypes.ShowDataRows:
            newState.showingDataTableRows = action.payload;
            return newState;

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
