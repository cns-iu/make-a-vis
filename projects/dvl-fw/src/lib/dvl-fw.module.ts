import { NgModule } from '@angular/core';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';
import { VisHostDirective } from './visualization/vis-host.directive';
import { ScatterplotComponent } from './plugins/ngx-dino/components/scatterplot/scatterplot.component';

@NgModule({
  imports: [],
  declarations: [DvlFwVisualizationComponent, VisHostDirective, ScatterplotComponent],
  exports: [DvlFwVisualizationComponent, ScatterplotComponent],
  entryComponents: [ScatterplotComponent]
})
export class DvlFwModule { }
