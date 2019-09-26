import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DvlFwAngularModule } from '@dvl-fw/angular';

import { DragDropModule } from '../drag-drop/drag-drop.module';
import { DataVariableDropzoneComponent } from './data-variable-dropzone/data-variable-dropzone.component';
import { GraphicVariableLegendComponent } from './graphic-variable-legend/graphic-variable-legend.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,

    DragDropModule,
    DvlFwAngularModule,

    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [MainComponent, DataVariableDropzoneComponent, GraphicVariableLegendComponent],
  exports: [MainComponent, DataVariableDropzoneComponent]
})
export class LegendViewModule { }
