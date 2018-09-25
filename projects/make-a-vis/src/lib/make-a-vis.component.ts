import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ApplicationState } from './shared/store/state';
import { getSaveProjectState } from './shared/store/reducer';
import { SidenavState } from './toolbar/shared/store';

@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent implements OnInit {
  @Input() theme = 'light-theme';
  checkUiState: Observable<SidenavState>; // for demo purpose
  checkSaveProject: Observable<string>;

  constructor(private store: Store<ApplicationState>) {

    this.checkUiState = store.pipe(select('ui'));
    this.checkUiState.subscribe((k) => { // subscribe to ui state changes
      console.log('application state output --- ', k); // for demo
    });

    this.checkSaveProject = store.pipe(select(getSaveProjectState));
    this.checkSaveProject.subscribe((k) => { // subscribe to ui state property changes via selector
      console.log('application state output --- ', k); // for demo
    });
  }

  ngOnInit() {
  }
}
