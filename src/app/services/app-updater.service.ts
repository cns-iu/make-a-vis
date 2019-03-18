import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

import { AppUpdateNotificationComponent } from '../app-update-notification/app-update-notification.component';

@Injectable({
  providedIn: 'root'
})
export class AppUpdaterService {
  isSnackbarloaded = false;
  checkUpdateInterval = 1000 * 60 * 60 * 2; // 2 hours
  constructor(
    private readonly appRef: ApplicationRef,
    private readonly updates: SwUpdate,
    private readonly snackbar: MatSnackBar
  ) { }


  /**
   * Checks for updates.
   * creates an observable that emits when the application is stable and checkUpdateInterval is completed.
   * Subsription calls the checkForUpdates function to poll if there's an update in the build.
   */
  checkForUpdates() {
    const appIsStable = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const checkInterval = interval(this.checkUpdateInterval);
    const checkUpdateObservable = concat(appIsStable, checkInterval);
    checkUpdateObservable.subscribe(() => this.updates.checkForUpdate());
  }

  /**
   * Asks to update.
   * When an update is available, it displays a snackbar notifying the user about the update.
   */
  askToUpdate() {
    this.updates.available.subscribe(event => {
      if (!this.isSnackbarloaded) {
        this.openSnackBar();
        this.isSnackbarloaded = true;
      }
    });
  }


  /**
   * Opens snack bar.
   * Uses angular material snackbar service to open the snackbar.
   * When 'REFRESH' button is pressed, updateApp function is called.
   */
  openSnackBar() {
    this.snackbar.openFromComponent(AppUpdateNotificationComponent, {
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    });
  }

  /**
   * Closes snackbar.
   */
  closeSnackbar() {
    this.isSnackbarloaded = false;
    this.snackbar.dismiss();
  }

  /**
   * Updates app whenever there is an active update available
   */
  updateApp() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
