import { NgModule } from '@angular/core';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';
import { NgxDinoModule } from './plugins/ngx-dino/ngx-dino.module';

@NgModule({
  imports: [NgxDinoModule],
  declarations: [DvlFwVisualizationComponent],
  exports: [DvlFwVisualizationComponent]
})
export class DvlFwModule { }
