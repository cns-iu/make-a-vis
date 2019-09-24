import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DvlFwVisualizationComponent } from './visualization.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DvlFwVisualizationComponent],
  exports: [DvlFwVisualizationComponent]
})
export class VisualizationModule { }
