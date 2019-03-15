// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { DvlFwModule } from '@dvl-fw/core';
// Components
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
// Icons
import { MarkdownModule } from 'ngx-markdown';
import { CancelIconComponent } from './icons/cancel/cancel-icon.component';
import { HorizontalBarGraphIconComponent } from './icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { GeomapIconComponent } from './icons/geomap/geomap-icon.component';
import { MapOfScienceIconComponent } from './icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from './icons/network/network-icon.component';
import { ScatterGraphIconComponent } from './icons/scatter-graph/scatter-graph-icon.component';
import { EditIconComponent } from './icons/edit/edit-icon.component';


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

    DvlFwModule
  ],
  declarations: [
    MenuComponent,
    MainComponent,

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
