import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { ScatterplotComponent } from './scatterplot.component';


@NgModule({
  imports: [NgxVegaModule],
  declarations: [ScatterplotComponent],
  exports: [ScatterplotComponent]
})
export class ScatterplotModule { }
