import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { NetworkComponent } from './network.component';


@NgModule({
  imports: [NgxVegaModule],
  declarations: [NetworkComponent],
  exports: [NetworkComponent]
})
export class NetworkModule { }
