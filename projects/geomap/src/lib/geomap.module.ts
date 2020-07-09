import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxVegaModule } from 'ngx-vega';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

import { GeomapComponent } from './geomap.component';
import { GeomapSettingsComponent } from './geomap-settings/geomap-settings.component';

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
