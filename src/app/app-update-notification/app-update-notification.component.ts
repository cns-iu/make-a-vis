import { Component } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mav-app-update-notification',
  templateUrl: './app-update-notification.component.html',
  styleUrls: ['./app-update-notification.component.scss']
})
export class AppUpdateNotificationComponent {

  constructor(private readonly updates: SwUpdate,
    private readonly snackbar: MatSnackBar) { }

  /**
   * Closes snackbar.
   */
  closeSnackbar() {
    this.snackbar.dismiss();
  }

  /**
   * Updates app whenever there is an active update available
   */
  updateApp() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
