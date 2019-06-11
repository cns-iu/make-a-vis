import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ItemComponent } from '../item/item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemComponent],
  exports: [ItemComponent]
})
export class ItemModule { }
