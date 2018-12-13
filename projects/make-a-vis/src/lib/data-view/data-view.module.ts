// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { DragDropModule } from '../drag-drop/drag-drop.module';
// Components
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { StartProjectOptionsComponent } from './start-project-options/start-project-options.component';
import { StartProjectIconComponent } from './icons/start-project-icon/start-project-icon.component';

@NgModule({
  imports: [
    CommonModule, DragDropModule, MatIconModule, MatTableModule, MatToolbarModule,
    MatButtonModule, MatButtonToggleModule, MatMenuModule
  ],
  declarations: [MainComponent, TableComponent, StartProjectOptionsComponent, StartProjectIconComponent],
  exports: [MainComponent]
})
export class DataViewModule { }
