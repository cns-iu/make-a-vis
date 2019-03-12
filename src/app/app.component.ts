import { Component, isDevMode } from '@angular/core';

import { AppUpdaterService } from './services/app-updater.service';

@Component({
  selector: 'mav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'make-a-vis-demo';
  constructor(private readonly appUpdaterService: AppUpdaterService) {
    if(!isDevMode()) {
      appUpdaterService.checkForUpdates();
      appUpdaterService.askToUpdate();
    }

  }
}
