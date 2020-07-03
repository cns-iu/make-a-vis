import { Component, isDevMode, OnInit } from '@angular/core';

import { AppUpdaterService } from './services/app-updater.service';

import { GlobalGeocoder, GlobalCitiesGeocoder } from 'geocoder-ts';

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
    // const geocoder = new Geocoder();
    // const geocoderGlobal = new GlobalGeocoder();
    const cityGeocoder = new GlobalCitiesGeocoder();

    const locations = [
      'ontario, canada',
      'paris, france',
      'Minneapolis, MN 55418 USA',
      '14 Avenue Pablo Picasso, 92000 Nanterre, France'
    ];

    cityGeocoder.getLocation(locations[3]).then(console.log);
  }
}
