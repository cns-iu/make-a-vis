import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdaterService {
  isSnackbarloaded = false;
  checkUpdateInterval = 1000 * 60 * 7;
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
   * When 'Click here to update!' button is pressed, updateApp function is called.
   */
  openSnackBar() {
    this.snackbar.open('New update available', 'Click here to update!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'app-update-snackbar-wrapper'
    }).onAction().subscribe(() => {
      this.updateApp();
    });
  }


  /**
   * Updates app whenever there is an active update available
   */
  updateApp() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
