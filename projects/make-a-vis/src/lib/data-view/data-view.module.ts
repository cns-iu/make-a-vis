import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '../drag-drop/drag-drop.module';

// Components
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule, MatTableModule, MatToolbarModule, DragDropModule
  ],
  declarations: [MainComponent, TableComponent],
  exports: [MainComponent]
})
export class DataViewModule { }
