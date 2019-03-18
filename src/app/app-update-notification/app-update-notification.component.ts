import { Component } from '@angular/core';

import { AppUpdaterService } from '../services/app-updater.service';

@Component({
  selector: 'mav-app-update-notification',
  templateUrl: './app-update-notification.component.html',
  styleUrls: ['./app-update-notification.component.scss']
})
export class AppUpdateNotificationComponent {

  constructor(readonly appUpdaterService: AppUpdaterService) { }

}
