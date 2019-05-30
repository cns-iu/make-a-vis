import { DoBootstrap, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProjectComponent } from './project/project.component';
import { LegendComponent } from './legend/legend.component';
import { VisualizationComponent } from './visualization/visualization.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ProjectComponent,
    LegendComponent,
    VisualizationComponent
  ],
  entryComponents: [ProjectComponent, LegendComponent, VisualizationComponent]
})
export class AppModule implements DoBootstrap {
  constructor(injector: Injector) {
    // TODO
  }

  ngDoBootstrap() { }
}
