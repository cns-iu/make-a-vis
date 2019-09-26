import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DvlFwAngularModule } from '@dvl-fw/angular';
import { MarkdownModule } from 'ngx-markdown';

import { AddIconComponent } from './icons/add/add-icon.component';
import { CancelIconComponent } from './icons/cancel/cancel-icon.component';
import { EditIconComponent } from './icons/edit/edit-icon.component';
import { GeomapIconComponent } from './icons/geomap/geomap-icon.component';
import { HorizontalBarGraphIconComponent } from './icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { MapOfScienceIconComponent } from './icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from './icons/network/network-icon.component';
import { ScatterGraphIconComponent } from './icons/scatter-graph/scatter-graph-icon.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,

    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MarkdownModule.forRoot(),

    DvlFwAngularModule
  ],
  declarations: [
    MenuComponent,
    MainComponent,

    AddIconComponent,
    CancelIconComponent,
    HorizontalBarGraphIconComponent,
    GeomapIconComponent,
    MapOfScienceIconComponent,
    NetworkIconComponent,
    ScatterGraphIconComponent,
    EditIconComponent
  ],
  exports: [MainComponent]
})
export class VisualizationViewModule { }
