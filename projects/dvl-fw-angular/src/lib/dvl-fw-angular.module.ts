import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ItemComponent } from './legend/item/item.component';
import { LegendComponent } from './legend/legend.component';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';


@NgModule({
  declarations: [LegendComponent, ItemComponent, DvlFwVisualizationComponent],
  imports: [CommonModule, MatCardModule],
  exports: [LegendComponent, ItemComponent, DvlFwVisualizationComponent]
})
export class DvlFwAngularModule {}
