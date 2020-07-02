import { Component, isDevMode, OnInit } from '@angular/core';

import { AppUpdaterService } from './services/app-updater.service';

import { Geocoder } from 'geocoder-ts';

@Component({
  selector: 'mav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'make-a-vis-demo';
  constructor(private readonly appUpdaterService: AppUpdaterService) {
    if (!isDevMode()) {
      appUpdaterService.checkForUpdates();
      appUpdaterService.askToUpdate();
    }

  }

  ngOnInit() {
    const geocoder = new Geocoder();

    console.log('location location: ', geocoder.getLocation('ontario, canada'));
    console.log('location location: ', geocoder.getLocation('paris, france'));
    // console.log('location location: ', geocoder.getLocation('edinburgh, IN 46124'));
    // console.log('location location: ', geocoder.getLocation('not a location test'));
  }
}
