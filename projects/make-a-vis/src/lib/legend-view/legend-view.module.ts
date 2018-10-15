import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Components
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class LegendViewModule { }
