// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '@dvl-fw/core';
import { ApplicationState, getLoadedProject } from './shared/store';
import { SidenavState } from './toolbar/shared/store';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TrackingPopupComponent } from './tracking-popup/tracking-popup.component';
import { TrackingState } from './shared/store/tracking-state';
import { fromEvent } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent implements OnInit {
  @Input() theme = 'light-theme';
  checkUiState: Observable<SidenavState>; // for demo purpose
  checkSaveProject: Observable<Project>;

  constructor(store: Store<ApplicationState>, elementRef: ElementRef<HTMLElement>, ga: GoogleAnalyticsService, readonly tracking: TrackingState, readonly snackbar: MatSnackBar) {
    this.checkUiState = store.pipe(select('ui'));
    this.checkSaveProject = store.pipe(select(getLoadedProject));

    const container = elementRef.nativeElement;
    fromEvent<MouseEvent>(container, 'mousemove').pipe(
      throttleTime(1000),
      tap((event) => {
        const label = `${event.clientX}_${event.clientY}_${container.clientWidth}_${container.clientHeight}`;
        ga.event('webpage', 'mousemove', label);
      })
    ).subscribe();
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {preClose: () => {snackBar.dismiss();} },
      duration: this.tracking.snapshot.allowTelemetry === undefined ? Infinity : 3000
    });
  }
}
