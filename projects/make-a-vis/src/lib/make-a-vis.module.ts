import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

import { MakeAVisComponent } from './make-a-vis.component';
import { LightThemeComponent } from './light-theme/light-theme.component';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule],
  declarations: [MakeAVisComponent, LightThemeComponent],
  exports: [MakeAVisComponent, ToolbarModule]
})
export class MakeAVisModule { }
