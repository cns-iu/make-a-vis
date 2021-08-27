import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ScatterplotComponent } from './scatterplot.component';
import { ScatterplotSettingsComponent } from './scatterplot-settings/scatterplot-settings.component';


@NgModule({
  imports: [
    NgxVegaModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [ScatterplotComponent, ScatterplotSettingsComponent],
  exports: [ScatterplotComponent]
})
export class ScatterplotModule { }
