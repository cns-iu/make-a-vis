// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '@dvl-fw/core';
import { ApplicationState, getLoadedProject } from './shared/store';
import { SidenavState } from './toolbar/shared/store';

@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent {
  @Input() theme = 'light-theme';
  checkUiState: Observable<SidenavState>; // for demo purpose
  checkSaveProject: Observable<Project>;

  constructor(store: Store<ApplicationState>) {
    this.checkUiState = store.pipe(select('ui'));
    this.checkSaveProject = store.pipe(select(getLoadedProject));
  }
}
