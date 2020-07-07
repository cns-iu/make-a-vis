import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { ScienceMapComponent } from './science-map.component';


@NgModule({
  imports: [CommonModule, NgxVegaModule],
  declarations: [ScienceMapComponent],
  exports: [ScienceMapComponent]
})
export class ScienceMapModule { }
