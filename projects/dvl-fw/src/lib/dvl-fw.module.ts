// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';

import { NgxDinoModule } from './plugins/ngx-dino/ngx-dino.module';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';


@NgModule({
  imports: [NgxDinoModule],
  declarations: [DvlFwVisualizationComponent],
  exports: [DvlFwVisualizationComponent]
})
export class DvlFwModule { }
