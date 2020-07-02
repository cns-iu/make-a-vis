import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DvlFwAngularModule } from '@dvl-fw/angular';

import { LegendComponent } from './legend/legend.component';
import { ProjectComponent } from './project/project.component';
import { VisualizationComponent } from './visualization/visualization.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    DvlFwAngularModule
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
