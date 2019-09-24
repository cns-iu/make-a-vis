import { NgModule } from '@angular/core';

import { LegendModule } from './legend/legend.module';
import { VisualizationModule } from './visualization/visualization.module';

@NgModule({
  imports: [LegendModule, VisualizationModule]
})
export class DvlFwAngularModule {}
