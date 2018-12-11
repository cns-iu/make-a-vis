// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '../drag-drop/drag-drop.module';
// Components
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule, DragDropModule, MatIconModule, MatTableModule, MatToolbarModule
  ],
  declarations: [MainComponent, TableComponent],
  exports: [MainComponent]
})
export class DataViewModule { }
