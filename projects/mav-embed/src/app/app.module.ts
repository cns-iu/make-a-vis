import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DvlFwModule } from '@dvl-fw/core';

import { LegendComponent } from './legend/legend.component';
import { ProjectComponent } from './project/project.component';
import { VisualizationComponent } from './visualization/visualization.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    DvlFwModule
  ],
  declarations: [
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
  constructor(injector: Injector) {
    this.registerCustomElement('mav-legend', LegendComponent, injector);
    this.registerCustomElement('mav-project', ProjectComponent, injector);
    this.registerCustomElement('mav-visualization', VisualizationComponent, injector);
  }

  ngDoBootstrap() { }

  private registerCustomElement<T>(selector: string, component: Type<T>, injector: Injector): void {
    const element = createCustomElement(component, { injector });
    customElements.define(selector, element);
  }
}
