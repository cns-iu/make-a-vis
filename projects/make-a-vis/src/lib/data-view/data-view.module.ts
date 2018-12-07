// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { DragDropModule } from '../drag-drop/drag-drop.module';
// Components
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule, MatTableModule, MatToolbarModule, MatExpansionModule, DragDropModule
  ],
  declarations: [MainComponent, TableComponent],
  exports: [MainComponent]
})
export class DataViewModule { }
