// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { DvlFwModule } from '@dvl-fw/core';
// Components
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
// Icons
import { AddIconComponent } from './icons/add/add-icon.component';
import { CancelIconComponent } from './icons/cancel/cancel-icon.component';
import { HorizontalBarGraphIconComponent } from './icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { GeomapIconComponent } from './icons/geomap/geomap-icon.component';
import { MapOfScienceIconComponent } from './icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from './icons/network/network-icon.component';
import { ScatterGraphIconComponent } from './icons/scatter-graph/scatter-graph-icon.component';


@NgModule({
  imports: [
    CommonModule,

    MatChipsModule,
    MatMenuModule,
    MatTabsModule,

    DvlFwModule
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
    ScatterGraphIconComponent
  ],
  exports: [MainComponent]
})
export class VisualizationViewModule { }
