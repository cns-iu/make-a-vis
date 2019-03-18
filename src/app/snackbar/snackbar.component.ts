import { Component } from '@angular/core';

import { AppUpdaterService } from '../services/app-updater.service';

@Component({
  selector: 'mav-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(readonly appUpdaterService: AppUpdaterService) { }

}
