import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { getAdvancedEnabledSelector, MavSelectionState } from '../../mav-selection/shared/store';
import { getLoadingShareUrlCompletedSelector, SidenavState } from '../shared/store';

@Component({
  selector: 'mav-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss']
})
export class ToolbarContentComponent implements OnDestroy {
  isSidenavOpen = false;

  /**
   * Advanced Enabled observable to that holds the value to determined if advanced options are enabled or not.
   */
  advancedEnabled$: Observable<boolean>;

  /**
   * Loading share url subscription of toolbar content component
   */
  loadingShareUrlSubscription: Subscription;

  constructor(private store: Store<SidenavState>, private mavSelectionStore: Store<MavSelectionState>) {
    /*
    * close the toolbar if application is launched using
    * a share URL.
    */
    this.loadingShareUrlSubscription = store.pipe(select(getLoadingShareUrlCompletedSelector)).subscribe((loaded) => {
      if (loaded) {
        this.isSidenavOpen = false;
      }
    });
    this.advancedEnabled$ = mavSelectionStore.pipe(select(getAdvancedEnabledSelector));
  }

  ngOnDestroy(): void {
    if (this.loadingShareUrlSubscription) {
      this.loadingShareUrlSubscription.unsubscribe();
    }
  }
}
