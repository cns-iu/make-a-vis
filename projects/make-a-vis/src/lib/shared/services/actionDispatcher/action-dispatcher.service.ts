import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as dataViewStore from '../../../data-view/shared/store';
import * as payloadTypes from '../../../data-view/shared/store/payload-types';

@Injectable({
  providedIn: 'root'
})
export class ActionDispatcherService {

  constructor(private dataTableStore: Store<dataViewStore.DataTableState>) { }

  toggleDataTableChildren(payload: payloadTypes.ToggleDataTableChildren) {
    if (!payload.hiddenChildren) {
    this.dataTableStore.dispatch(new dataViewStore.ShowDataTableChildren(payload));
    } else {
      this.dataTableStore.dispatch(new dataViewStore.HideDataTableChildren(payload));
    }
  }

  toggleDataTableRows(payload: payloadTypes.ToggleDataTableRows) {
    if (!payload.hiddenRows) {
      this.dataTableStore.dispatch(new dataViewStore.ShowDataRows(payload));
    } else {
    this.dataTableStore.dispatch(new dataViewStore.HideDataRows(payload));
    }
  }
}
