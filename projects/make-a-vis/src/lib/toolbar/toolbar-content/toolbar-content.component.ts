import { ChangeDetectorRef, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAdvancedEnabledSelector, MavSelectionState } from '../../mav-selection/shared/store';
import { getLoadingShareUrlCompletedSelector, SidenavState } from '../shared/store';

@Component({
  selector: 'mav-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss']
})
export class ToolbarContentComponent {
  isSidenavOpen = false;
  advancedEnabled$: Observable<boolean>;
  constructor(private store: Store<SidenavState>, private mavSelectionStore: Store<MavSelectionState>, private cdr: ChangeDetectorRef) {
    /*
    * close the toolbar if application is launched using
    * a share URL.
    */
    store.pipe(select(getLoadingShareUrlCompletedSelector)).subscribe((loaded) => {
      if (loaded) {
        this.isSidenavOpen = false;
      }
    });
    this.advancedEnabled$ = mavSelectionStore.pipe(select(getAdvancedEnabledSelector));
  }
}
