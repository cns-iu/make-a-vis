import { Component, isDevMode, ElementRef, OnInit  } from '@angular/core';

import { AppUpdaterService } from './services/app-updater.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TrackingState, TrackingPopupComponent } from 'make-a-vis';
import { fromEvent } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'mav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'make-a-vis-demo';
  constructor(private readonly appUpdaterService: AppUpdaterService, elementRef: ElementRef<HTMLElement>, ga: GoogleAnalyticsService, readonly tracking: TrackingState, readonly snackbar: MatSnackBar) {
    if (!isDevMode()) {
      appUpdaterService.checkForUpdates();
      appUpdaterService.askToUpdate();
    }

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
