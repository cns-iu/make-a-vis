import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DvlFwAngularModule } from '@dvl-fw/angular';

import { LegendComponent } from './legend/legend.component';
import { ProjectComponent } from './project/project.component';
import { VisualizationComponent } from './visualization/visualization.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TrackingPopupModule, INITIAL_TELEMETRY_SETTING } from 'make-a-vis';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from '../environments/environment';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    DvlFwAngularModule,
    MatSnackBarModule,
    TrackingPopupModule,
    NgxGoogleAnalyticsModule.forRoot(
      INITIAL_TELEMETRY_SETTING === false ? '' : environment.googleAnalyticsTag, [
      { command: 'set', values: [{ app: 'mav-embed' }] }
    ]),
  ],
  declarations: [
    LegendComponent,
    ProjectComponent,
    VisualizationComponent
  ],
  exports: [
    LegendComponent,
    ProjectComponent,
    VisualizationComponent
  ],
  entryComponents: [
    LegendComponent,
    ProjectComponent,
    VisualizationComponent
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const { injector } = this;
    this.registerCustomElement('mav-legend', LegendComponent, injector);
    this.registerCustomElement('mav-project', ProjectComponent, injector);
    this.registerCustomElement('mav-visualization', VisualizationComponent, injector);
  }

  private registerCustomElement<T>(selector: string, component: Type<T>, injector: Injector): void {
    const element = createCustomElement(component, { injector });
    customElements.define(selector, element);
  }
}
