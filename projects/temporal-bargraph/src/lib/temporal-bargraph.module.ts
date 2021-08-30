import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TemporalBargraphComponent } from './temporal-bargraph.component';
import { TemporalSettingsComponent } from './temporal-bargraph-settings/temporal-bargraph-settings.component';


@NgModule({
  imports: [
    NgxVegaModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [TemporalBargraphComponent, TemporalSettingsComponent],
  exports: [TemporalBargraphComponent]
})
export class TemporalBargraphModule { }
