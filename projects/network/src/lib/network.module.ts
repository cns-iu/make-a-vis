import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

import { NetworkComponent } from './network.component';
import { NetworkSettingsComponent } from './network-settings/network-settings.component';


@NgModule({
  imports: [
    NgxVegaModule,
    MatIconModule,
    MatCheckboxModule,
    MatSliderModule
  ],
  declarations: [NetworkComponent, NetworkSettingsComponent],
  exports: [NetworkComponent]
})
export class NetworkModule { }
