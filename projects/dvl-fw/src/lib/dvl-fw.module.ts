// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';

import { LegendModule } from './legend/legend.module';
import { VisualizationModule } from './visualization/visualization.module';


@NgModule({
  imports: [VisualizationModule, LegendModule],
  exports: [VisualizationModule, LegendModule]
})
export class DvlFwModule { }
