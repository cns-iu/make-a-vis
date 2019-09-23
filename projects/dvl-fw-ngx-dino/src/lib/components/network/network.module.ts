// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkModule as NgxNetworkModule } from '@ngx-dino/network';

import { NetworkComponent } from './network.component';

@NgModule({
  imports: [CommonModule, NgxNetworkModule],
  declarations: [NetworkComponent],
  entryComponents: [NetworkComponent]
})
export class NetworkModule { }
