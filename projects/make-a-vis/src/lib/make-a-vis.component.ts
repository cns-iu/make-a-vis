import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from './shared/store';

import { SidenavState } from './toolbar/shared/store';
import { Project } from 'dvl-fw';

@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent {
  @Input() theme = 'light-theme';
  checkUiState: Observable<SidenavState>; // for demo purpose
  checkSaveProject: Observable<Project>;

  constructor(private store: Store<ApplicationState>) {
    this.checkUiState = store.pipe(select('ui'));
    this.checkSaveProject = store.pipe(select(getLoadedProject));
  }
}
