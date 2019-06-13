import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDinoModule } from '../plugins/ngx-dino/ngx-dino.module';
import { DvlFwVisualizationComponent } from './visualization.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDinoModule
  ],
  declarations: [DvlFwVisualizationComponent],
  exports: [DvlFwVisualizationComponent]
})
export class VisualizationModule { }
