import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MakeAVisModule } from 'make-a-vis';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppUpdateNotificationComponent } from './app-update-notification/app-update-notification.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TrackingPopupModule } from './tracking-popup/tracking-popup.module';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { INITIAL_TELEMETRY_SETTING } from './services/tracking-state';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { TrackingState } from './services/tracking-state';

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
    NgxGoogleAnalyticsRouterModule,
    NgxsDataPluginModule.forRoot(),

    NgxsModule.forRoot([TrackingState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppUpdateNotificationComponent]
})
export class AppModule { }
