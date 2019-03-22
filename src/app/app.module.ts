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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppUpdateNotificationComponent]
})
export class AppModule { }
