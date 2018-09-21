import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../shared/store/state';
import { SidenavState } from '../shared/store/state';
import { SidenavActionTypes } from '../shared/store/actions';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isSidenavOpen = false;
  checkSidenavState: Observable<SidenavState>;

  constructor(private store: Store<ApplicationState>) {
    this.checkSidenavState = store.pipe(select('sidenav'));
    this.checkSidenavState.subscribe((k) => {
      console.log('state output --- ', k); // for example
    });
  }

  ngOnInit() {
  }

  setSidenavState(event: boolean) {
    this.isSidenavOpen = event;
    this.store.dispatch({ type: SidenavActionTypes.SaveProject }); // for example
  }
}
