import { Component, Input } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState, getLoadedProject } from './shared/store';
import { SidenavActionTypes, SidenavState } from './toolbar/shared/store';


@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent {
  @Input() theme = 'light-theme';
  checkUiState: Observable<SidenavState>; // for demo purpose
  checkSaveProject: Observable<Project>;
  loading = false;

  constructor(store: Store<ApplicationState>, actions: Actions) {
    this.checkUiState = store.pipe(select('ui'));
    this.checkSaveProject = store.pipe(select(getLoadedProject));

    actions.subscribe(action => {
      switch (action.type) {
        case SidenavActionTypes.LoadProjectStarted:
        case SidenavActionTypes.LoadShareUrlStarted:
          this.loading = true;
          break;

        case SidenavActionTypes.LoadProjectCompleted:
        case SidenavActionTypes.LoadProjectError:
        case SidenavActionTypes.LoadShareUrlCompleted:
        case SidenavActionTypes.LoadShareUrlError:
          this.loading = false;
          break;
      }
    });
  }
}
