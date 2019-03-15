import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { SidenavState, getLoadingShareUrlCompletedSelector } from '../shared/store';

@Component({
  selector: 'mav-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: ['./toolbar-content.component.scss']
})
export class ToolbarContentComponent {
  isSidenavOpen = false;

  constructor(private store: Store<SidenavState>) {
    /*
    * close the toolbar if application is launched using
    * a share URL.
    */
    store.pipe(select(getLoadingShareUrlCompletedSelector)).subscribe((loaded) => {
      if (loaded) {
        this.isSidenavOpen = false;
        }
    });
  }
}
