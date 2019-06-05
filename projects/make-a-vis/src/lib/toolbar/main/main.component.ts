import { Component, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { getLoadingProjectCompletedSelector, SidenavState } from '../shared/store';
import { ToolbarContentComponent } from '../toolbar-content/toolbar-content.component';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('mavToolbarContent', { static: false }) toolbarContent: ToolbarContentComponent;

  constructor(private store: Store<SidenavState>) {
    store.pipe(select(getLoadingProjectCompletedSelector)).subscribe((loaded) => {
      if (!loaded) {
        if (this.toolbarContent) {
          this.toolbarContent.isSidenavOpen = false;
        }
      }
    });
  }
}
