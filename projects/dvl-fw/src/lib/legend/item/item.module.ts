import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { VisualizationModule } from '../../visualization/visualization.module';
import { ItemComponent } from '../item/item.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    VisualizationModule
  ],
  declarations: [ItemComponent],
  exports: [ItemComponent]
})
export class ItemModule { }
