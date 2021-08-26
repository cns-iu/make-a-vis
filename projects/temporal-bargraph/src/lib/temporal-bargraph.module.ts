import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TemporalBargraphComponent } from './temporal-bargraph.component';


@NgModule({
  imports: [NgxVegaModule, MatCheckboxModule, MatIconModule],
  declarations: [TemporalBargraphComponent],
  exports: [TemporalBargraphComponent]
})
export class TemporalBargraphModule { }
