import * as payloadTypes from './payload-types';

export interface DataTableState {
    showingDataTableChildren: payloadTypes.ToggleDataTableChildren;
    showingDataTableRows: payloadTypes.ToggleDataTableRows;
}

export const INITIAL_DATATABLE_STATE: DataTableState = {
    showingDataTableChildren: {
        hiddenChildren: false,
        dataSourceId: ''
    },
    showingDataTableRows: {
        hiddenRows: false,
        dataSourceId: ''
    }
};

