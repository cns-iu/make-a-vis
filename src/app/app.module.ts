import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MakeAVisModule, TrackingPopupModule, INITIAL_TELEMETRY_SETTING } from 'make-a-vis';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppUpdateNotificationComponent } from './app-update-notification/app-update-notification.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

const appRoutes: Routes = [
  { path: '', component: AppComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AppUpdateNotificationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MakeAVisModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatIconModule,
    MatSnackBarModule,
    TrackingPopupModule,
    NgxGoogleAnalyticsModule.forRoot(INITIAL_TELEMETRY_SETTING === false ? '' : environment.googleAnalyticsTag),
    NgxGoogleAnalyticsRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppUpdateNotificationComponent]
})
export class AppModule { }
