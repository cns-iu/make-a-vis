import { Component, isDevMode, OnInit } from '@angular/core';

import { AppUpdaterService } from './services/app-updater.service';

import { DefaultGeocoder } from 'geocoder-ts';

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
    const defaultGeocoder = new DefaultGeocoder(
      'pk.eyJ1IjoiYWRwaGlsbGlwczIwMTciLCJhIjoiY2s1NDNvaHdrMGZidDNobHFkdHB5MG1wcCJ9.NG8JyVzQuA6pP9UfZhlubg',
      200
    );

    const locations = [
      'Caprara,IT',
      'Paris, France',
      'Minneapolis, MN 55418 USA',
      '14 Avenue Pablo Picasso, 92000 Nanterre, France'
    ];

    // const locations = [
    //   'Caprara,IT',
    //   'New York, US'
    // ];

    locations.forEach(location => {
      defaultGeocoder.getLocation(location)
        .then(result => {
          console.log('location search: ', location, '\nresult: ', result);
        });
    });
  }
}
