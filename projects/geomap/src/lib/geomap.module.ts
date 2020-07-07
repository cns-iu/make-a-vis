import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { GeomapComponent } from './geomap.component';


@NgModule({
  imports: [NgxVegaModule],
  declarations: [GeomapComponent],
  exports: [GeomapComponent]
})
export class GeomapModule { }
