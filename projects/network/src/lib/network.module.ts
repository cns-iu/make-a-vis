import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NetworkComponent } from './network.component';
import { NetworkSettingsComponent } from './network-settings/network-settings.component';


@NgModule({
  imports: [
    NgxVegaModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [NetworkComponent, NetworkSettingsComponent],
  exports: [NetworkComponent]
})
export class NetworkModule { }
