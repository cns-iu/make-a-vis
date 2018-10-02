import { NgModule } from '@angular/core';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';
import { ScatterplotComponent } from './plugins/ngx-dino/components/scatterplot/scatterplot.component';

@NgModule({
  imports: [],
  declarations: [DvlFwVisualizationComponent, ScatterplotComponent],
  exports: [DvlFwVisualizationComponent, ScatterplotComponent],
  entryComponents: [ScatterplotComponent]
})
export class DvlFwModule { }
