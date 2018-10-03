import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { getLoadingProjectCompletedSelector, SidenavState } from '../shared/store';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isSidenavOpen = false;

  constructor(private store: Store<SidenavState>) {
    store.pipe(select(getLoadingProjectCompletedSelector)).subscribe((loaded) => {
      if (!loaded) {
        this.setSidenavState(loaded);
      }
    });
  }

  ngOnInit() {
  }

  setSidenavState(event: boolean) {
    this.isSidenavOpen = event;
  }
}
