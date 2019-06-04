import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '../drag-drop/drag-drop.module';
import { StartProjectIconComponent } from './icons/start-project-icon/start-project-icon.component';
import { TableIconComponent } from './icons/table-icon/table-icon.component';
import { MainComponent } from './main/main.component';
import { StartProjectOptionsComponent } from './start-project-options/start-project-options.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,

    DragDropModule,
  ],
  declarations: [
    MainComponent,
    StartProjectOptionsComponent,
    StartProjectIconComponent,
    TableComponent,
    TableIconComponent
  ],
  exports: [MainComponent]
})
export class DataViewModule { }
