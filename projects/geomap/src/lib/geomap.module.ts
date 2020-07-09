import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxVegaModule } from 'ngx-vega';

import { GeomapSettingsComponent } from './geomap-settings/geomap-settings.component';
import { GeomapComponent } from './geomap.component';


@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatDialogModule,
    NgxVegaModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [GeomapComponent, GeomapSettingsComponent],
  exports: [GeomapComponent, GeomapSettingsComponent],
  providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class GeomapModule { }
