import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DvlFwModule } from 'dvl-fw';

import { DragDropModule } from '../drag-drop/drag-drop.module';

// Components
import { MainComponent } from './main/main.component';
import { DataVariableDropzoneComponent } from './data-variable-dropzone/data-variable-dropzone.component';

@NgModule({
  imports: [
    CommonModule,

    DvlFwModule,
    DragDropModule,

    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [MainComponent, DataVariableDropzoneComponent],
  exports: [MainComponent, DataVariableDropzoneComponent]
})
export class LegendViewModule { }
