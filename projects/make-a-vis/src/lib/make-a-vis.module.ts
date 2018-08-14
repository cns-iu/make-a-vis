import { NgModule } from '@angular/core';
import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

import { MakeAVisComponent } from './make-a-vis.component';

@NgModule({
  imports: [DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule],
  declarations: [MakeAVisComponent],
  exports: [MakeAVisComponent]
})
export class MakeAVisModule { }
