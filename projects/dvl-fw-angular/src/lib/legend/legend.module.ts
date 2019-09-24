import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ItemModule } from './item/item.module';
import { LegendComponent } from './legend.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    ItemModule
  ],
  declarations: [LegendComponent],
  exports: [ItemModule, LegendComponent]
})
export class LegendModule { }
