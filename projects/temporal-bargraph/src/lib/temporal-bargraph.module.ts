import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { TemporalBargraphComponent } from './temporal-bargraph.component';


@NgModule({
  imports: [NgxVegaModule],
  declarations: [TemporalBargraphComponent],
  exports: [TemporalBargraphComponent]
})
export class TemporalBargraphModule { }
