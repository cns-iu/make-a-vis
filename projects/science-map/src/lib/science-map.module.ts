import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ScienceMapComponent } from './science-map.component';
import { ScienceMapSettingsComponent } from './science-map-settings/science-map-settings.component';


@NgModule({
  imports: [
    CommonModule,
    NgxVegaModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [ScienceMapComponent, ScienceMapSettingsComponent],
  exports: [ScienceMapComponent]
})
export class ScienceMapModule { }
