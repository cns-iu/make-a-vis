// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DragDropModule } from '../drag-drop/drag-drop.module';
import { DvlFwModule } from '@dvl-fw/core';
// Components
import { DataVariableDropzoneComponent } from './data-variable-dropzone/data-variable-dropzone.component';
import { GraphicVariableLegendComponent } from './graphic-variable-legend/graphic-variable-legend.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,

    DragDropModule,
    DvlFwModule,

    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [MainComponent, DataVariableDropzoneComponent, GraphicVariableLegendComponent],
  exports: [MainComponent, DataVariableDropzoneComponent]
})
export class LegendViewModule { }
